import React from 'react';
import { templates } from 'core/js/reactHelpers';

export default function ScrollMarquee(props) {
  return (
    <div className="component__inner scroll-marquee__inner-wrapper">
      <templates.header {...props} />
      <div className="component__widget scroll-marquee__widget">
        <p>ScrollMarquee component is working! Add items to see the marquee.</p>
      </div>
    </div>
  );
}
