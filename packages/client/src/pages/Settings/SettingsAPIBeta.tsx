import { useEffect, useState } from "react";
import Header from "components/Header";
import { Input } from "components/Elements";
import {
  DocumentDuplicateIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import ApiService from "services/api.service";
import { useNavigate } from "react-router-dom";

const tabs = [
  { name: "Account", href: "/beta/settings", current: false },
  { name: "API", href: "", current: true },
  { name: "Email", href: "/beta/settings/email", current: false },
  { name: "SMS", href: "/beta/settings/sms", current: false },
  { name: "Slack", href: "/beta/settings/slack", current: false },
  { name: "Events", href: "/beta/settings/events", current: false },
  { name: "Plan", href: "/beta/settings/plan", current: false },
  { name: "Billing", href: "/beta/settings/billing", current: false },
  { name: "Team Members", href: "/beta/settings/team", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SettingsAPIBeta() {
  const [privateAPIKey, setPrivateAPIKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await ApiService.get({ url: "/accounts/settings" });
      setPrivateAPIKey(data.apiKey);
    })();
  }, []);

  const handleAPIKeyUpdate = async () => {
    const { data } = await ApiService.patch({
      url: "/accounts/keygen",
      options: {},
    });
    setPrivateAPIKey(data);
  };

  const handleAPIKeyCopy = () => {
    navigator.clipboard.writeText(privateAPIKey);
  };

  return (
    <>
      <div>
        {/* Content area */}
        <div className="">
          <div className="mx-auto flex flex-col">
            <Header />
            <main className="flex-1">
              <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
                <div className="pt-10 pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                      Settings
                    </h1>
                  </div>
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      {/* Tabs */}
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                          defaultValue={tabs.find((tab) => tab.current)?.name}
                          onChange={(ev) => navigate(ev.currentTarget.value)}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name} value={tab.href}>
                              {tab.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                  tab.current
                                    ? "border-purple-500 text-purple-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>

                      {/* Description list with inline editing */}
                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Keys
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            Use these keys when making calls to the Laudspeaker
                            API.
                          </p>
                        </div>
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Events API Key
                              </dt>
                              <dd>
                                <div className="relative rounded-md">
                                  <Input
                                    type="text"
                                    name="privateAPIKey"
                                    id="privateAPIKey"
                                    value={privateAPIKey}
                                    disabled
                                    className="disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm pr-[55px] text-ellipsis"
                                    aria-invalid="true"
                                    aria-describedby="password-error"
                                  />
                                  <div className="absolute inset-y-0 flex right-[10px]">
                                    <div
                                      className="flex items-center cursor-pointer mr-[5px]"
                                      onClick={handleAPIKeyCopy}
                                    >
                                      <DocumentDuplicateIcon
                                        className="h-5 w-5 text-grey-400"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div
                                      className="flex items-center cursor-pointer"
                                      onClick={handleAPIKeyUpdate}
                                    >
                                      <ArrowPathIcon
                                        className="h-5 w-5 text-grey-400"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}