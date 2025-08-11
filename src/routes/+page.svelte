<div class:container={true}>
        <div class:header={true}>Welcome to SvelteKit Todos Demo</div>
       
        <div class:content={true}>Please Login Or Register!</div>
        <div class:enterContainer={true}>
            <nav class:mainNav={true}>
                <a class:link={true} href="/demo/lucia">Login</a>
                <hr />
                <a class:link={true} href="/demo/lucia">Register</a>
            </nav>
        </div>
</div>
<style>
    .header {
        padding:0.1em;
        padding-top: 1em;
        margin: 0.1em;
    }
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

    .content {
            display:flex;
            padding:0.2em;
            margin:0.1em;
    }

    .enterContainer {
        display:flex;
        padding:0.2em;
        margin:0.1em;
        margin-bottom: 2em;
    }

    .mainNav {
        margin:0.2em;
        padding:0.2em;
        background-color:aliceblue;
        gap: 2em;
    }

    a {
        margin: 0.2em;
        font-size:medium;
        color:rgb(65, 133, 82);
        text-decoration: none;
    }

    .link {
        margin: 1em;
        padding: 1em;
    }
    
</style>