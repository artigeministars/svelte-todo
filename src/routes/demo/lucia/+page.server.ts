import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	const user_todos = await getTodos();
	return { user , ...user_todos };
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, '/');
	},
	addTodo: async (event) => {
		const formData = await event.request.formData();
		const todo_caption = formData.get('todo_caption');
		const todo_content = formData.get('todo_content');
		const user_id = formData.get('user_id');
		// console.log("user id ---->",user_id);
		const dataObj : Omit<table.Todos,"id"> = {
							todo_cap : todo_caption!.toString(),
							todo: todo_content!.toString(),
							userId : user_id!.toString(),
							createdAt: new Date()
						};
		return await addTodoItem(dataObj);
		// return { datar };
	},
	deleteTodo: async (event) => {
		const formData = await event.request.formData();
		const user_id = formData.get('todo_id');

		return await deleteTodoItem(user_id);
	},
	editTodo: async (event) => {

		const formData = await event.request.formData();
		const todo_caption = formData.get('todo_caption');
		const todo_content = formData.get('todo_content');
		const todo_id = formData.get('todo_id');

		const dataObj : { id : number; todo_cap: string; todo: string } = {
							id: todo_id as unknown as number,
							todo_cap : todo_caption!.toString(),
							todo: todo_content!.toString(),
							// userId : user_id!.toString(),
							
						};

		return await editTodoItem(dataObj);
	}
};

function requireLogin() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		return redirect(302, '/demo/lucia/login');
	}

	return locals.user;
}

async function getTodos() {
	const { locals } = getRequestEvent();
	let results;
	if (!locals.user) {
		return redirect(302, '/demo/lucia/login');
	} else {
     results = await db.select().from(table.todos).where(eq(table.todos.userId, locals.user.id));

		const existingTodo = results.at(0);
		if (!existingTodo) {
			return fail(400, { message: 'Incorrect username or password' });
		}
	}
    // console.log(locals.user.id);
	return { results };

}

async function addTodoItem(datas: any) {

const returned = await db.insert(table.todos).values({ 
							userId: datas.userId , 
							todo: datas.todo, 
							todo_cap: datas.todo_cap, 
							createdAt: datas.createdAt
						}).returning();

// console.log(" returning id : ", returned);

	if(returned.length > 0) {
				return { returned };
	} else {
				return fail(400, { message: 'Error occured, todo could not be inserted!' });
	}


}

async function deleteTodoItem(todoId: any) {
	
const returned =  await db.delete(table.todos).where(eq(table.todos.id, todoId)).returning();

	if(returned.length > 0) {
				return { returned };
	} else {
				return fail(400, { message: 'Error occured, todo could not be deleted!' });
	}
}

async function editTodoItem(datas: any) {

   const returned = await db.update(table.todos).set({ todo: datas.todo, todo_cap: datas.todo_cap }).where(eq(table.todos.id, datas.id)).returning();

// console.log(" returning id : ", returned);

	if(returned.length > 0) {
				return { returned };
	} else {
				return fail(400, { message: 'Error occured, todo could not be updated!' });
	}

}