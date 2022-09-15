<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import spinner from '@iconify-icons/mdi/reload.js'
</script>

<div class="spinner">
  <Icon icon={spinner} width={24} />
</div>

<!-- <div class="loader"></div> -->
<style>
  .spinner {
    align-items: center;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
    display: flex;
    justify-content: center;
  }
  .loader {
    width: 2rem;
    height: 2rem;
    border-width: 3px;
    border-style: dashed solid solid dotted;
    border-color: #fff #fff transparent #fff;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 11px;
    top: 20px;
    border: 7px solid transparent;
    border-right-color: #fff;
    transform: rotate(-40deg);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
