import React from 'react';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function ScrollMarquee(props) {
  const {
    _id,
    _items
  } = props;

  return (
    <div className="component__inner scroll-marquee__inner-wrapper">

      <templates.header {...props} />

      <div className="component__widget scroll-marquee__widget">

        {_items && _items.length > 0 ? (
          <div className="scroll-marquee__block">
            <div className="scroll-marquee__inner">
              {_items.map((item, index) => (
                <div
                  className={classes([
                    'scroll-marquee__item',
                    item._classes
                  ])}
                  key={index}
                >
                  {item._graphic?.src && (
                    <div className="scroll-marquee__item-image">
                      <img
                        src={item._graphic.src}
                        alt={item._graphic.alt || item.alt || ''}
                        aria-label={item._graphic.alt || item.alt || ''}
                      />
                      {item._graphic.attribution && (
                        <div
                          className="scroll-marquee__item-attribution"
                          dangerouslySetInnerHTML={{ __html: compile(item._graphic.attribution, props) }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="scroll-marquee__placeholder">
            <p>Please add items to the marquee.</p>
          </div>
        )}

      </div>

    </div>
  );
}
