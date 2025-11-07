import React from 'react';
import { templates, classes, compile, prefixClasses } from 'core/js/reactHelpers';

export default function ScrollMarquee(props) {
  const {
    _id,
    _globals,
    displayTitle,
    title,
    body,
    instruction,
    _items
  } = props;

  return (
    <div className="component__inner scroll-marquee__inner-wrapper">

      <templates.header {...props} />

      <div className="component__widget scroll-marquee__widget">

        <div className="scroll-marquee__block">
          <div className="scroll-marquee__inner">
            {_items?.map(({ _graphic, alt, attribution, _classes }, index) => (
              <div
                className={classes([
                  'scroll-marquee__item',
                  _classes
                ])}
                key={index}
              >
                {_graphic?.src && (
                  <div className="scroll-marquee__item-image">
                    <img
                      src={_graphic.src}
                      alt={alt || ''}
                      aria-label={alt || ''}
                    />
                    {attribution && (
                      <div
                        className="scroll-marquee__item-attribution"
                        dangerouslySetInnerHTML={{ __html: compile(attribution, props) }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
