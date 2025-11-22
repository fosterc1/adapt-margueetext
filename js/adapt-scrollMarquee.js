import components from 'core/js/components';
import ScrollMarqueeView from './scrollMarqueeView';
import ComponentModel from 'core/js/models/componentModel';

export default components.register('scrollMarquee', {
  view: ScrollMarqueeView,
  model: ComponentModel.extend({})
});


