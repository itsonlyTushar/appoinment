import React from "react";

const Card = ({
  heading,
  description,
  tags = [],
  isAvailableAllDays = false,
  badge,
  icon,
  footer,
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-surface rounded-2xl border border-body/10 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col justify-between ${onClick ? "cursor-pointer" : ""
        } ${className}`}
    >
      <div>
        {(badge || isAvailableAllDays) && (
          <div className="flex items-center justify-between gap-2 mb-3">
            {badge && (
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                {badge}
              </span>
            )}

            {isAvailableAllDays && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 ml-auto">
                24/7 Available
              </span>
            )}
          </div>
        )}
        <div className="flex items-start gap-3">
          {icon && (
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1">
            {heading && (
              <h3 className="font-heading font-semibold text-lg text-heading leading-snug">
                {heading}
              </h3>
            )}
          </div>
        </div>
        {description && (
          <p className="mt-2 text-sm text-body line-clamp-3 leading-relaxed font-semibold">
            {description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2.5 py-0.5 rounded-md bg-background text-body font-medium border border-body/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>

      {footer && (
        <div className="mt-5 pt-4 border-t border-body/10">{footer}</div>
      )}
    </div>
  );
};

export default Card;
