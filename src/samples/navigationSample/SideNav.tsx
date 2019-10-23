import React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { ISampleNavLink } from '../navigationSample/navlinks';
import { useHistory } from 'react-router-dom';

interface SideNavProps {
  navLinks: ISampleNavLink[]
}

export const SideNav: React.FC<SideNavProps> = (props) => {
  const history = useHistory();
  return (
    <Nav
      groups={[{
          links: props.navLinks.map(navLink => ({
            name: navLink.name,
            key: navLink.key,
            url: navLink.url,
          }))
        }]}
      onLinkClick={
        (ev?: React.MouseEvent<HTMLElement>, navLink?: ISampleNavLink) => {
          if (ev && navLink) {
            history.push(navLink.url)
            ev.preventDefault();
          }
        }
      }
      selectedKey={history.location.pathname}
    />
  );
};