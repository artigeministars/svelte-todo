<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData , ActionData } from './$types';


	let { data = $bindable(), form }: { data: PageServerData , form: ActionData } = $props();
	let isAddTodoShowed = $state(false);

	function toggleTodoFormState() {
		isAddTodoShowed = !isAddTodoShowed;
	}

	console.log(" data ",data);
</script> 
<div class:container={true} >
<div class:headContainer={true}>
	<div style="align-content:center">
		<h3>Hi, {data.user.username}!</h3>
	</div>
	<div style="align-content:center">
		<span>Your user ID is {data.user.id}.</span>
	</div>
	<div style="align-content:center">

	<form method="post" action="?/logout" use:enhance>
		<button style="background-color:lightblue;border-radius:0.2em;border-color:aquamarine;box-shadow:0.1em 0.1em 0.1em">Sign out</button>
	</form>
	</div>
</div>
<div class:addTodoContainer={true} >
	<button onclick={toggleTodoFormState} class:showTodoButton={true}>Add Todo</button>
</div>

{#if isAddTodoShowed }
<div class:addTodoFormContainer={true}>
<h4 style="display:flex;align-content:center;">Add Todo</h4>
<form method="post" action="?/addTodo" use:enhance>
	<label style="display:flex;align-content:center;margin-top:2em;margin-bottom:2em;">
		Todo Caption
		<input style="display:flex;align-content:center;margin-left:0.2em;border-color:lightblue" type="text" name="todo_caption" />
	</label>
	<label style="display:flex;align-content:center;">
		Todo Content
		<textarea style="display:flex;align-content:center;margin-left:0.2em;border-color:lightblue" name="todo_content" rows="4"></textarea>
	</label>
	<input type="hidden" name="user_id"  value={data.user.id} />
	
	<button class:addTodoButton={true}>Add</button>
    
</form>
<p style="color: red">{form?.message ?? ''}</p>
<!-- <p style="color: red">inserted id : {form!.returned![0].id}</p> -->
 </div>
{/if}

{#if data.results }
<div class:todoListContainer={true}>
		{#each data.results as tudo, i}
				<div style:background-color={i % 2 == 0 ? '#E2DDB4' : '#F6EFD2'} class:todoCard={true}>
					<div style="display:flex;align-self:center;margin-top:0.5em;margin-bottom:0.3em;">{i + 1} : {tudo.userId} </div>
					<form method="post" action="?/editTodo" use:enhance>
						<label style="display:flex;align-content:center;margin-top:2em;margin-bottom:2em;">
							<span style="width:4em;margin-left:0.2em">Id</span>
							<input style="display:flex;align-content:center;margin-left:0.2em;border-color:lightblue;width:14em" type="text" bind:value={tudo.id} name="todo_id" readonly />
						</label>
						<label style="display:flex;align-content:center;margin-top:2em;margin-bottom:2em;">
							<span style="width:4em;margin-left:0.2em">Caption</span>
							<input style="display:flex;align-content:center;margin-left:0.2em;border-color:lightblue;width:14em" type="text" bind:value={tudo.todo_cap} name="todo_caption" />
						</label>
						<label style="display:flex;align-content:center;margin-top:2em;margin-bottom:2em;">
							<span style="width:4em;margin-left:0.2em">Content</span>
							<textarea style="display:flex;align-content:center;margin-left:0.2em;border-color:lightblue;width:14em;min-height:10em;height:auto" bind:value={tudo.todo} name="todo_content" > </textarea>
						</label>
					<input type="hidden" name="todo_id"  value={tudo.id} />
					<div><button class:editTodoButton={true}>Edit</button></div>
					</form>
					<div>
					<form method="post" action="?/deleteTodo" use:enhance>
					<input type="hidden" name="todo_id"  value={tudo.id} />
					<button class:deleteTodoButton={true}>Delete</button>
					</form>
					</div>
				</div>
		{/each}
	
</div>
{/if}
</div>

<style>
.container {
			background-color:rgb(207, 238, 226);
            padding:0.1em;
            margin: 0.2em;
            margin-top: 2em;
            width:auto;
			min-width: 60em;
            height:100%;
            display:flex;
            flex-direction:column;
            gap: 4em;
            flex-wrap: wrap;
            justify-content:space-between;
            align-items: center;
}

.headContainer {
			display:flex;
			margin-top:0.4em;
			justify-content:space-around;
			flex-direction: row;
			gap:4em;
			width: 60em;
			border-radius: 0.2em;
			box-shadow: 0.1em 0.1em 0.1em;
			background-color:rgb(179, 220, 245);
}

.addTodoContainer {
			display:flex;
			width: 60em;
			justify-content:flex-end;

}

.showTodoButton {
			margin:0.2em;
			padding:0.3em;
			border-radius:0.2em;
			border-color:rgb(144, 179, 245);
			background-color:rgb(164, 195, 252);
			align-content:center;
			box-shadow: 0.1em 0.1em 0.1em rgb(151, 184, 247);
}

.addTodoFormContainer {
			display:flex;
			width: 60em;
			background-color:lightblue;
			justify-content:space-around;
			flex-direction: row;
			border-radius: 0.2em;
			box-shadow: 0.1em 0.1em 0.1em;
}

.addTodoButton {
			border-radius:0.2em;
			padding: 0.2em;
			padding-left:2em;
			border-color:rgb(144, 179, 245);
			background-color:rgb(164, 195, 252);
			box-shadow: 0.1em 0.1em 0.1em rgb(151, 184, 247);
			display:flex;
			float:right;
			margin-top:0.4em;
			margin-bottom:0.4em;
			margin-right:0.1em;
			width: 7em;
}

.todoListContainer {
			background-color:rgb(198, 224, 214);
            padding:0.1em;
            margin: 0.2em;
			margin-bottom:3em;
            width:60em;
			min-width: 60em;
            height:100%;
            display:flex;
            flex-direction:row;
            gap: 1em;
            flex-wrap: wrap;
            justify-content:space-between;
            align-items: center;
			box-shadow: 0.1em 0.1em 0.1em;
			border-radius:0.2em;
}

.todoCard {
			display:flex;
			width:18em;
			margin: 0.1em;
			padding:0.1em;
			border-radius: 0.2em;
			flex-wrap:wrap;
			align-self:center;
			flex-direction: column;
			justify-content: space-between;
			box-shadow: 0.1em 0.1em 0.1em;
}

.editTodoButton {
			border-radius:0.2em;
			padding: 0.2em;
			padding-left:2em;
			border-color:rgb(153, 227, 250);
			background-color:rgb(164, 231, 252);
			box-shadow: 0.1em 0.1em 0.1em rgb(153, 227, 250);
			display:flex;
			float:right;
			margin-top:0.4em;
			margin-bottom:0.3em;
			margin-right:0.1em;
			width: 7em;
}

.deleteTodoButton {
			border-radius:0.2em;
			padding: 0.2em;
			padding-left:2em;
			border-color:rgb(248, 150, 150);
			background-color:rgb(252, 164, 164);
			box-shadow: 0.1em 0.1em 0.1em rgb(248, 150, 150);
			display:flex;
			float:right;
			margin-top:0.4em;
			margin-bottom:0.4em;
			margin-right:0.1em;
			width: 7em;
}

</style>