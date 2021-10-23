<script>
  //import { FetchData } from "@edwinspire/fetch/FetchData.js";
  const FetchData = require("@edwinspire/universal-fetch");
  import MessageD from "./ModalMessage.svelte";
  export let EndPoint;
  export let Show = false;
  let loading = false;

  let FData = new FetchData("/");
  /*
  $: {
    console.log({ Show });
  }
*/
  async function SaveEndPoint() {
    //    console.log('Endpoint ', EndPoint);
    loading = true;
    let dataEndpoint;
    try {
      if (EndPoint.idendpoint && EndPoint.idendpoint > 0) {
        // Modificar un endpoint
        const res = await FData.put("/pgapi_v2/endpoint", EndPoint, {
          "Content-Type": "application/json",
        });
        dataEndpoint = await res.json();
        console.log(dataEndpoint);
      } else {
        // Inserta un endpoint nuevo
        const res = await FData.post("/pgapi_v2/endpoint", EndPoint, {
          "Content-Type": "application/json",
        });
        dataEndpoint = await res.json();
        console.log(dataEndpoint);
      }
      loading = false;
      Show = false;
    } catch (error) {
      console.error(error);
      loading = false;
    }
  }
</script>

<MessageD bind:Show on:ok={SaveEndPoint}>
  <span slot="title">EndPoint</span>
  <div slot="body">
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Versión</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input
              class="input is-small"
              type="number"
              step="0.1"
              placeholder="versión"
              bind:value={EndPoint.version}
            />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-small">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Endpoint</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input
              class="input is-small"
              type="text"
              placeholder="endpoint"
              bind:value={EndPoint.endpoint}
            />
          </p>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Habilitado</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input type="checkbox" bind:checked={EndPoint.enabled} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Sistema</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input type="checkbox" bind:checked={EndPoint.system} />
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    

    <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label is-small">Descripción</label>
      <div class="control">
        <textarea
          class="textarea has-fixed-size is-small"
          placeholder="Description"
          bind:value={EndPoint.description}
        />
      </div>
    </div>

    <div class="field">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label is-small">Nota</label>

      <p class="control">
        <input
          class="input is-small"
          type="text"
          placeholder="Notes"
          bind:value={EndPoint.note}
        />
      </p>
    </div>
  </div>
</MessageD>

<style>
</style>
