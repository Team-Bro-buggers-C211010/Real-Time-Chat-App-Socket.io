import PropTypes from 'prop-types';
import { memo } from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-4 lg:p-12 min-h-screen">
      <div className="max-w-md text-center space-y-6">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? 'animate-pulse' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-base-content">{title}</h2>
        {subtitle && (
          <p className="text-sm lg:text-base text-base-content/60">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

AuthImagePattern.displayName = 'AuthImagePattern';

AuthImagePattern.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default memo(AuthImagePattern);