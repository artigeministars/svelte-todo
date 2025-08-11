<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>
<div class:container={true} >
<h3>Login/Register</h3>
<div class:formContainer={true}>
<form method="post" action="?/login" use:enhance>
	<div>
		<label class:formElementLabel={true}>
		<span style="width:6em;margin-left:0.3em">Username</span>
		<input class:formElement={true} name="username" />
	</label>
	</div>
	<div>
	<label class:formElementLabel={true}>
		<span style="width:6em;margin-left:0.3em">Password</span>
		<input class:formElement={true} type="password" name="password" />
	</label>
	</div>
	<div>
	<button class:formButton={true}>Login</button>
	</div>
	<div>
	<button class:formButton={true} formaction="?/register">Register</button>
	</div>
</form>
</div>
<p style="color: red">{form?.message ?? ''}</p>
</div>

<style>
.container {
            background-color:rgb(207, 238, 226);
            padding:0.1em;
            margin: 0.2em;
            margin-top: 4em;
            width:auto;
            height:100%;
            display:flex;
            flex-direction:column;
            gap: 4em;
            flex-wrap: wrap;
            justify-content:space-between;
            align-items: center;
    }

	.formContainer {
		    background-color:rgb(183, 216, 204);
			border-radius: 0.4em;
			box-shadow: 0.2em 0.2em rgb(173, 216, 200);
            padding:0.2em;
            margin: 0.4em;
            width:auto;
            height:100%;
            display:flex;
            flex-direction:column;
            gap: 4em;
            flex-wrap: wrap;
            justify-content:space-between;
            align-items: center;
	}

	.formElementLabel {
		display:flex;
		width: 20em;
		margin: 0.4em;
	}

	.formElement {
		width: 12em;
	}

	.formButton {
		width: 12.6em;
		margin-left: 8em;
		margin-bottom: 0.3em;
		margin-top:0.3em;
		color:rgb(65, 100, 90);
		background-color: rgb(190, 230, 230);
		border-radius: 0.3em;
		border-color:rgb(186, 245, 245);
		box-shadow: 0.1em 0.1em 0.1em;
	}

</style>