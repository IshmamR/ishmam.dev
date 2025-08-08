import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  GlobeIcon,
  LightbulbIcon,
  type LucideProps,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

type IntroPhoneItem = {
  type: "phone";
  tel: string;
};
type IntroJobItem = {
  type: "job";
  company?: {
    name: string;
    url: `https://${string}`;
  };
};
type IntroCustomItem = {
  type: "custom";
  icon: React.ComponentType<LucideProps>;
  url?: `https://${string}`;
};

type IntroItemProps = (
  | IntroPhoneItem
  | IntroJobItem
  | IntroCustomItem
  | {
      type: "founder" | "email" | "location";
    }
) & {
  title: string;
};

function IntroIcon({ type }: { type: IntroItemProps["type"] }) {
  let Icon = BriefcaseBusinessIcon;
  switch (type) {
    case "job":
      Icon = CodeXmlIcon;
      break;
    case "founder":
      Icon = LightbulbIcon;
      break;
    case "phone":
      Icon = PhoneIcon;
      break;
    case "email":
      Icon = MailIcon;
      break;
    case "location":
      Icon = MapPinIcon;
      break;
    default:
      Icon = BriefcaseBusinessIcon;
  }

  return <Icon className="text-muted-foreground pointer-events-none size-4" />;
}

function IntroItem(props: IntroItemProps) {
  return (
    <div className="flex items-center gap-4 font-mono text-sm">
      <dt
        className="bg-edge dark:bg-muted flex size-6 shrink-0 items-center justify-center rounded-lg dark:inset-shadow-[1px_1px_1px,0px_0px_1px] dark:inset-shadow-white/15"
        aria-hidden
      >
        <p className="sr-only">{props.type}</p>
        <span>
          {props.type === "custom" ? (
            <props.icon className="text-muted-foreground pointer-events-none size-4" />
          ) : (
            <IntroIcon type={props.type} />
          )}
        </span>
      </dt>
      <dd className="text-balance">
        {props.type === "custom" ? (
          props.url ? (
            <a
              className="decoration-ring ml-0.5 underline-offset-4 hover:underline"
              href={props.url}
            >
              {props.title}
            </a>
          ) : (
            props.title
          )
        ) : props.type === "phone" || props.type === "email" ? (
          <a
            className="decoration-ring ml-0.5 underline-offset-4 hover:underline"
            href={
              props.type === "phone"
                ? `tel:${props.tel}`
                : `mailto:${props.title}`
            }
          >
            {props.title}
          </a>
        ) : (
          <>
            {props.title}&nbsp;
            {props.type === "job" && props.company ? (
              <>
                @
                <a
                  className="decoration-ring ml-0.5 font-semibold underline-offset-4 hover:underline"
                  href={props.company.url}
                  target="__blank"
                  rel="noopener"
                >
                  {props.company.name}
                </a>
              </>
            ) : null}
          </>
        )}
      </dd>
    </div>
  );
}

export function OverviewSection() {
  return (
    <section>
      <h2 className="sr-only">Overview</h2>

      <div className="border-edge [&_*]:border-edge overflow-clip border-y px-4">
        <dl className="mx-auto max-w-[1024px] space-y-2 border-x p-4">
          <IntroItem
            type="job"
            title="Sr. Software Engineer"
            company={{
              name: "Headless Technologies LTD.",
              url: "https://headless.ltd",
            }}
          />
          <IntroItem type="location" title="Dhaka, Bangladesh" />
          <IntroItem type="email" title="ishmam785@gmail.com" />
          <IntroItem
            type="phone"
            tel="+8801405274359"
            title="Available on request"
          />
          <IntroItem
            type="custom"
            icon={GlobeIcon}
            title="ishmam.dev"
            url="https://ishmam.dev"
          />
        </dl>
      </div>
    </section>
  );
}
