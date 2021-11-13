<script context="module">

	export function preload(page, session) {
		return { page, session };
	}
</script>

<script>
	export let page;
    export let session;
    console.log(page, session);

</script>

<div>
  <slot name="content" />
</div>
