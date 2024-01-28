/**
 * Type for defining the color scheme of the application.
 * 'auto' - Automatically switches between 'dark' and 'light' based on system settings.
 * 'dark' - Dark mode is always enabled.
 * 'light' - Light mode is always enabled.
 */
export type Scheme = 'auto' | 'dark' | 'light';

/**
 * Type for defining the responsive breakpoints in the application.
 * The keys are the breakpoint names (e.g., 'xs', 'sm', etc.),
 * and the values are the corresponding CSS media queries.
 */
export type Screens = { [key: string]: string };

/**
 * Type for defining the theme of the application.
 * 'theme-default' - The default theme of the application.
 * string - The ID of a custom theme.
 */
export type Theme = 'theme-default' | string;

/**
 * Type for defining multiple themes in the application.
 * Each theme is represented as an object with 'id' and 'name' properties.
 */
export type Themes = { id: string; name: string }[];

/**
 * Interface for the application configuration.
 * layout - The layout type of the application.
 * scheme - The color scheme of the application.
 * screens - The responsive breakpoints in the application.
 * theme - The theme of the application.
 * themes - The multiple themes in the application.
 */
export interface UnstyledConfig {
  layout: string;
  scheme: Scheme;
  screens: Screens;
  theme: Theme;
  themes: Themes;
}
