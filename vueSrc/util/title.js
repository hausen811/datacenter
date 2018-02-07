function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}
function getMeta (vm) {
  const { meta } = vm.$options
  if (meta) {
    return typeof meta === 'function'
      ? meta.call(vm)
      : meta
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)||''
    const meta = getMeta(this)||''
    if (title) {
      this.$ssrContext.title = `${title}`;
    }
    if (meta) {
      this.$ssrContext.meta = `${meta}`;
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)||''
    const meta = getMeta(this)||''
    if (title) {
      document.title = `${title}`;
    }
    if (meta) {
      document.meta = `${meta}`;
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
