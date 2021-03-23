
<script>
    import Session from "../../components/edwinspire/Session/Required.svelte";
    export let doggies = {};
  </script>

<Session>
    <h1>welcome to the doggie details page</h1>
{JSON.stringify(doggies)}

</Session>