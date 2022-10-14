import React, { forwardRef, SVGProps } from 'react';

const SVGMock = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      name="SVGMock"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className="Ursa-IconSVG"
      focusable="false"
      aria-hidden="true"
      data-testid="mock-icon"
      ref={ref}
      {...props}
    ></svg>
  )
);

SVGMock.displayName = 'SVGMock';

export const TickMinor = SVGMock;
export const MinusMinor = SVGMock;
export default SVGMock;
