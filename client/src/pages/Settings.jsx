import { useSelector, useDispatch } from "react-redux"
import { THEMES } from "../Theme_Constants/theme"
import { setTheme } from "../features/Theme/themeSlice"

const Settings = () => {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Theme <span className={`text-sm text-base-content/80`}>(Current Theme: {theme.theme.charAt(0).toUpperCase() + theme.theme.slice(1)})</span></h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface.</p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {
            THEMES.map((t, i) => (
              <button
                key={i}
                className={`group flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors shadow-base-300 shadow-lg ${theme === t ? 'bg-base-200 border-2 border-primary' : 'hover:bg-base-300 border border-transparent'}`}
                onClick={() => dispatch(setTheme(t))}
                data-theme={t}
              >
                <div className="relative h-8 w-full rounded-md overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1" data-theme={t}>
                    <div className="rounded bg-base-content"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className={`text-sm font-medium truncate w-full text-center ${theme === t ? 'text-primary underline' : 'text-base-content'}`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Settings