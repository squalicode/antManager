function ThemeSelector({onChange, selected}) {
    return (
        <label>
            Theme
            <select value={selected} name="theme" onChange={e => onChange(e.target.value)}>
                <option value="classic">Classic</option>
                <option value="dark">Dark</option>
                <option value="contrast">High contrast</option>
            </select>
        </label>
    );
}
  
export default ThemeSelector;