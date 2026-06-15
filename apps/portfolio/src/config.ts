export const SITE_OWNER = "Issy Ng";
export const SITE_HANDLE = "issyngissy";
export const SITE_REPOSITORY = "issyng";
export const SITE_BASE = `/${SITE_REPOSITORY}`;
export const SITE_URL = `https://${SITE_HANDLE}.github.io${SITE_BASE}/`;

export const CONTACT_EMAIL = "issy.ng@icloud.com";
export const GITHUB_URL = `https://github.com/${SITE_HANDLE}`;
export const LINKEDIN_URL = "https://www.linkedin.com/in/issy-ng-433967275/";
export const BUSINESS_NAME = "Render Marketing";
export const BUSINESS_URL = "https://rendermarketing.com.au";
export const REPOSITORY_URL = `${GITHUB_URL}/${SITE_REPOSITORY}`;

export const SITE_TITLE = `${SITE_OWNER} | Portfolio`;
export const SITE_DESCRIPTION =
	"Issy Ng's portfolio, resume, business, and contact links.";

export function withBase(path = "/") {
	const base = import.meta.env.BASE_URL ?? "/";
	const normalizedBase = base.endsWith("/") ? base : `${base}/`;

	if (
		path.startsWith("#") ||
		path.startsWith("mailto:") ||
		/^(?:[a-z]+:)?\/\//i.test(path) ||
		path.startsWith(normalizedBase)
	) {
		return path;
	}

	const cleanPath = path.startsWith("/") ? path.slice(1) : path;

	return `${normalizedBase}${cleanPath}`;
}
