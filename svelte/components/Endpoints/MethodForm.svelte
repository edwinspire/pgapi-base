<script>
  //import { FetchData } from "@edwinspire/fetch/FetchData.js";
  const FetchData = require("@edwinspire/universal-fetch");
  import MessageD from "./ModalMessage.svelte";
  export let Method;
  export let Show = false;
  let loading = false;

  let FData = new FetchData("/");

  async function SaveMethod() {
    console.log(Method);
    loading = true;
    let dataMethod;
    try {
      if (Method.idmethod && Method.idmethod > 0 && Method.idendpoint > 0) {
        // Modificar un Method
        const res = await FData.put("/pgapi_v2/pgapi/v2/method", Method, {
          "Content-Type": "application/json",
        });
        dataMethod = await res.json();
      } else {
        // Inserta un Method nuevo
        const res = await FData.post("/pgapi_v2/pgapi/v2/method", Method, {
          "Content-Type": "application/json",
        });
        dataMethod = await res.json();
      }
      loading = false;
      Show = false;
    } catch (error) {
      console.error(error);
      loading = false;
    }
  }
</script>

{#if Method}
  <MessageD bind:Show on:ok={SaveMethod}>
    <span slot="title">Método</span>
    <div slot="body" class="initial_text_initial">
      <div class="columns">
        <div class="column">
          <div class="field is-horizontal">
            <div class="field-label is-small">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">Método</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <span class="control">
                  <div class="select is-small is-fullwidth">
                    <select bind:value={Method.method}>
                      <option value="CONNECT">CONNECT</option>
                      <option value="DELETE">DELETE</option>
                      <option value="GET">GET</option>
                      <option value="HEAD">HEAD</option>
                      <option value="OPTIONS">OPTIONS</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="TRACE">TRACE</option>
                    </select>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-horizontal">
            <div class="field-label is-small">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">Habilitado</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <p class="control">
                  <input type="checkbox" bind:checked={Method.enabled} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field is-horizontal">
            <div class="field-label is-small">
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label class="label">Público</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <p class="control">
                  <input type="checkbox" bind:checked={Method.ispublic} />
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
            bind:value={Method.description}
          />
        </div>
      </div>

      <div class="field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label is-small">Variables</label>
        <div class="control">
          <textarea
            class="textarea has-fixed-size is-small"
            placeholder="Notes"
            bind:value={Method.declare}
          />
        </div>
      </div>

      <div class="field">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label is-small">Código</label>
        <div class="control">
          <textarea
            class="textarea has-fixed-size is-small"
            placeholder="Notes"
            bind:value={Method.code}
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
            bind:value={Method.note}
          />
        </p>
      </div>
    </div>
  </MessageD>
{/if}

<style>
  .initial_text_initial {
    text-align: initial;
  }
</style>
