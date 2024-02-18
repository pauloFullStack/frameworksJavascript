<script>
    export let message;
    export let backgroundColor;
    export let isNotification;
    export let svg;
    export let functionMessage;
</script>

{#if isNotification}
    <div
        style="display: flex;align-items: center;justify-content: center;"
        id="divMessageNotification"
    >
        <div
            style="display: flex;align-items: center;justify-content: center;flex-direction: column;padding: 1rem;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);border-radius: .5rem;background-color:{backgroundColor};color:#000"
        >
            <p>{message}</p>
            <button
                style="background-color: transparent;border: 1px solid transparent;cursor:pointer"
                on:click={functionMessage}>{@html svg}</button
            >
        </div>
    </div>
{/if}
