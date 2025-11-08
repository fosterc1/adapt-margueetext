import components from 'core/js/components';
import templates from 'core/js/reactHelpers';
import ScrollMarqueeView from './scrollMarqueeView';
import ComponentModel from 'core/js/models/componentModel';
import scrollMarqueeTemplate from './scrollMarquee.jsx';

// Register the JSX template
templates.register('scrollMarquee', scrollMarqueeTemplate);

export default components.register('scrollMarquee', {
  model: ComponentModel.extend({}),
  view: ScrollMarqueeView
});
