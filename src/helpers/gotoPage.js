import eventBus from '@/eventBus';

export default function gotoPage(pageName, pageParam) {
  eventBus.$emit('gotoPage', pageName, pageParam);
}
