

<script>
  import { onMount } from "svelte";
  import { FetchData } from "@edwinspire/fetch/FetchData.js";
  import Menu from "../../components/edwinspire/Menu/Menu.svelte";

  let FData = new FetchData();
  let promise = new Promise((resolve, reject) => {

    resolve();
});

  async function fetchData() {
    const res = await FData.get("/pgapi/omab/files", {}, {
      'Content-Type': 'application/json'
    });
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  onMount(async () => {
promise = await fetchData();

  });
</script>

<Menu />
{#await promise}
  <p>Buscando productos...</p>
{:then items}
  <div class="columns is-multiline">
    {#each items as item}
      <div class="column is-4-desktop">

      </div>
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

