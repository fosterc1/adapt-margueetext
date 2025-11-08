import components from 'core/js/components';
import ScrollMarqueeView from './scrollMarqueeView';
import ComponentModel from 'core/js/models/componentModel';

export default components.register('scrollMarquee', {
  model: ComponentModel.extend({}),
  view: ScrollMarqueeView
});
