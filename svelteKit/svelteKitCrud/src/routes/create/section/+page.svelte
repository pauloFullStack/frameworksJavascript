<script>
    import { enhance } from "$app/forms";
    import { response, clearNotification } from "../../../shared/js/notification";
    import DivNotification from "../../../shared/components/divNotification.svelte";

    let isNotification = false;
    let message = "";
    let backgroundColor = "";
    let svg = "";

    const isNotNotification = () => (isNotification = false);
</script>

<h1>Criar seção</h1>

<!-- Criar o site todo aqui, trazer tudo o que esta no outro projeto para esse e implementar, modal, inputs, tabelas... transformar em componentes, esse componente abaixo 'DivNotification' , fazer dele um modal  -->
<!-- Fazer um componente form generico onde eu passo, tudo o que eu quero que o form seja , e os campos que form tenha, a posição , action, methodo... depois acabar de fazer o crud... e criar um layout padrão com  -->
<DivNotification
    {isNotification}
    {message}
    {backgroundColor}
    {svg}
    functionMessage={isNotNotification}
/>


<form
    method="POST"
    action="?/create"
    use:enhance={() => {
        return async ({ result }) => {
            const res = response(result.data);

            isNotification = true;
            backgroundColor = res.backgroundColor;
            message = res.message;
            svg = res.svg;
        };
    }}
>
    <div style="margin: 1rem 0;">
        <input
            type="text"
            name="title"
            autocomplete="off"
            placeholder="Title"
            on:focus={(event) => clearNotification(event)}
            on:keydown={() => {
                isNotification = false;
            }}
        />
        <span class="span-notification-style" name="titleNotification"></span>
    </div>
    <div style="margin: 1rem 0;">
        <input
            type="text"
            name="description"
            autocomplete="off"
            placeholder="Description"
            on:focus={(event) => clearNotification(event)}
            on:keydown={() => {
                isNotification = false;
            }}
        />
        <span class="span-notification-style" name="descriptionNotification"
        ></span>
    </div>
    <div style="margin: 1rem 0;">
        <input
            type="text"
            name="icon"
            autocomplete="off"
            placeholder="SVG"
            on:focus={(event) => clearNotification(event)}
            on:keydown={() => {
                isNotification = false;
            }}
        />
        <span class="span-notification-style" name="iconNotification"></span>
    </div>
    <div style="margin: 1rem 0;">
        <input
            type="text"
            name="position"
            autocomplete="off"
            placeholder="Position"
            on:focus={(event) => clearNotification(event)}
            on:keydown={() => {
                isNotification = false;
            }}
        />
        <span class="span-notification-style" name="positionNotification"
        ></span>
    </div>
    <input type="hidden" name="routeParameter" value="1" />
    <input type="hidden" name="sectionType" value="section" />
    <button>Salvar</button>
</form>
