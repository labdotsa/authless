<script lang="ts">
let { data } = $props();
</script>

<h1>Account</h1>
{#if data.status === "signed_in"}
  <p>Signed in as <code>{data.subject}</code>.</p>
  <form method="POST" action="/logout"><button type="submit">Sign out</button></form>
{:else}
  <p>Signed out.</p>
{/if}
