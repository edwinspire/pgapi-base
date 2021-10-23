<script>
  // En este bloque importar las celdas
  //import CellIdEventType_132_133 from "./CellEventCode_XMLE.svelte";
  import MethodForm from "../../Endpoints/MethodForm.svelte";
  export let value;
  export let row = {};

  let showMethodForm = false;
  let MethodSelected;

  function HandleOnShowMethod(e) {
    MethodSelected = e;
    showMethodForm = true;
  }
</script>

<!-- El siguiente bloqu e no modificarlo -->
<td class="has-text-centered">
  <div class="buttons has-addons are-small is-right">
    {#if Array.isArray(value)}
      {#each value as { enabled, method }, i}
        <button
          on:click={() => {
            HandleOnShowMethod(value[i]);
          }}
          class="button"
          class:is-danger={method === "DELETE"}
          class:is-success={method === "GET"}
          class:is-primary={method === "PATH"}
          class:is-warning={method === "POST"}
          class:is-link={method === "PUT"}
        >
          {#if !enabled}
            <span class="icon is-small">
              <i class="fas fa-times" />
            </span>
          {/if}

          <span>{method}</span>
        </button>
      {/each}
    {/if}
    <button
      class="button"
      on:click={() => {
        HandleOnShowMethod({
          idendpoint: row.idendpoint,
          endpoint: "",
          enable: true,
          ispublic: false,
          declare: "",
          code: "",
          note: "",
        });
      }}
    >
      <span class="icon is-small">
        <i class="fas fa-plus" />
      </span></button
    >
  </div>
  <MethodForm bind:Show={showMethodForm} bind:Method={MethodSelected} />
</td>
