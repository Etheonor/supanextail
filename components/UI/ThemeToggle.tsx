/*
This component will handle the theme (dark/light). You are able to change the selected theme line 9.
DaisyUI have more than 10 themes availables https://daisyui.com/docs/default-themes
*/

import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { useEffect, useState } from 'react';

const theme = {
  primary: 'supaTheme',
  secondary: 'dark',
};

const ThemeToggle = (): JSX.Element => {
  const [activeTheme, setActiveTheme] = useState(
    document.body.dataset.theme || ''
  );
  const inactiveTheme = activeTheme === 'supaTheme' ? 'dark' : 'supaTheme';

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  return (
    <button className="flex ml-3" onClick={() => setActiveTheme(inactiveTheme)}>
      {activeTheme === theme.secondary ? (
        <HiOutlineSun className="m-auto text-xl hover:text-accent" />
      ) : (
        <HiOutlineMoon className="m-auto text-xl hover:text-accent" />
      )}
    </button>
  );
};

export default ThemeToggle;
