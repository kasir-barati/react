import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import './LoadingSpinner.component.css';

const accessibilityAttributes: DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> = {
  'role': 'presentation',
  'title': 'Loading...',
  'aria-label': 'Loading...',
};

export function LoadingSpinnerEclipsingMoon() {
  return (
    <span
      {...accessibilityAttributes}
      className="loader-eclipsing-moon"
    >
      L &nbsp; ading
    </span>
  );
}

interface LoadingSpinnerFullMoonProps {
  style?: CSSProperties;
}

export function LoadingSpinnerFullMoon({
  style,
}: Readonly<LoadingSpinnerFullMoonProps>) {
  return (
    <span
      style={style}
      {...accessibilityAttributes}
      className="loader-full-moon"
    ></span>
  );
}

export function LoadingSpinnerMoonToSun() {
  return (
    <span
      {...accessibilityAttributes}
      className="loader-moon-to-sun"
    ></span>
  );
}

export function LoadingSpinnerSun() {
  return (
    <span {...accessibilityAttributes} className="loader-sun"></span>
  );
}

interface LoadingSpinnerBluePlanetProps {
  style?: CSSProperties;
}

export function LoadingSpinnerBluePlanet({
  style,
}: Readonly<LoadingSpinnerBluePlanetProps>) {
  return (
    <span
      style={style}
      {...accessibilityAttributes}
      className="loader-blue-planet"
    ></span>
  );
}
