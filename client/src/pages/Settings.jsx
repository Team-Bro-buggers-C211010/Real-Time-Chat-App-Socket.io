import { useSelector, useDispatch } from "react-redux";
import { THEMES } from "../Theme_Constants/theme";
import { setTheme } from "../features/Theme/themeSlice";
import { BsFillSendFill } from "react-icons/bs";
import { memo } from "react";

const previewMessages = [
  {
    id: 1,
    content: "Hey there! How's it going?",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm doing well, thanks! Just working on some projects.",
    isSent: true,
  },
];

const Settings = () => {
  const { theme } = useSelector((state) => state.theme);
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-8 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
            Theme{" "}
            <span className="text-sm text-base-content/60">
              (Current: {theme.charAt(0).toUpperCase() + theme.slice(1)})
            </span>
          </h2>
          <p className="text-sm text-base-content/60">
            Choose a theme for your chat interface.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-2 p-3 rounded-lg transition-colors shadow-md cursor-pointer ${theme === t
                  ? "bg-base-200 border-2 border-primary"
                  : "hover:bg-base-300 border border-base-300"
                }`}
              onClick={() => dispatch(setTheme(t))}
              data-theme={t}
              aria-label={`Select ${t} theme`}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1" data-theme={t}>
                  <div className="rounded bg-base-content"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span
                className={`text-sm font-medium truncate w-full text-center ${theme === t ? "text-primary underline" : "text-base-content/80"
                  }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-base-content mb-3">Preview</h3>
          <div className="rounded-xl border border-base-300 bg-base-100 shadow-lg overflow-hidden">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto">
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        {authUser?.userName?.charAt(0).toUpperCase() || "J"}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-base-content">
                          {authUser?.userName || "John Doe"}
                        </h3>
                        <p className="text-xs text-base-content/60">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {previewMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"
                          }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-3 shadow-sm ${message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200 text-base-content"
                            }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1 text-base-content/60 ${message.isSent ? "text-primary-content/60" : ""
                              }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                        aria-label="Preview message input"
                      />
                      <button
                        className="btn btn-primary btn-sm h-10 min-h-0"
                        disabled
                        aria-label="Preview send button"
                      >
                        <BsFillSendFill className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Settings.displayName = "Settings";

export default memo(Settings);