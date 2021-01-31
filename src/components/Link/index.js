import React from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

export default function Link({
  children, href, username, ...props
}) {
  if (username.length > 0) {
    return (
      <NextLink href={href} passHref>
        <a {...props}>
          {children}
        </a>
      </NextLink>
    );
  }
  return (
    <div style={{marginBottom:'10px'}}>{children}</div>
  );
}

Link.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
