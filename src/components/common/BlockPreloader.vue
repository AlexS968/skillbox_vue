<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style>
.big {
  width: 300px;
  height: 300px;
  margin: 30px auto;
}
.small {
  width: 35px;
  height: 35px;
}
.preloader {
  display: block;
  position: relative;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #337AB7;
  animation: preloader-spin 2s linear infinite;
}
.preloader:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #BFE2FF;
  animation: preloader-spin 3s linear infinite;
}
.preloader:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #337AB7;
  animation: preloader-spin 1.5s linear infinite;
}
@keyframes preloader-spin {
  0%   {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
