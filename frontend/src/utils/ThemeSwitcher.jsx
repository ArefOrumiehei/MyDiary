import { useTheme } from "../contexts/ThemeProviderContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      style={{ marginLeft: 8, padding: "4px 8px", borderRadius: 6 }}
    >
      <option value="neutral">خنثی</option>
      <option value="happy">شاد</option>
      <option value="sad">غمگین</option>
    </select>
  );
}
