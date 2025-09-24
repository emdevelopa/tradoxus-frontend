import {
	BarChart3,
	CheckCircle,
	Database,
	Gift,
	Key,
	Lightbulb,
	Link,
	Network,
	Users,
} from "lucide-react";
import type { TFunction } from "i18next";

import type { Benefit, Feature } from "../types/web3.type";

export const features = (t: TFunction): Feature[] => [
	{
		id: "feature-1",
		title: t("web3.features.feature-1.title"),
		description: t("web3.features.feature-1.description"),
		icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
		bgColor: "bg-blue-900/30",
		borderColor: "hover:border-blue-500",
	},
	{
		id: "feature-2",
		title: t("web3.features.feature-2.title"),
		description: t("web3.features.feature-2.description"),
		icon: <Gift className="h-6 w-6 text-purple-400" />,
		bgColor: "bg-purple-900/30",
		borderColor: "hover:border-purple-500",
	},
	{
		id: "feature-3",
		title: t("web3.features.feature-3.title"),
		description: t("web3.features.feature-3.description"),
		icon: <Database className="h-6 w-6 text-green-400" />,
		bgColor: "bg-green-900/30",
		borderColor: "hover:border-green-500",
	},
	{
		id: "feature-4",
		title: t("web3.features.feature-4.title"),
		description: t("web3.features.feature-4.description"),
		icon: <Network className="h-6 w-6 text-amber-400" />,
		bgColor: "bg-amber-900/30",
		borderColor: "hover:border-amber-500",
	},
];

export const benefits = (t: TFunction): Benefit[] => [
	{
		id: "benefit-1",
		title: t("web3.benefits.benefit-1.title"),
		description: t("web3.benefits.benefit-1.description"),
		icon: <CheckCircle className="h-6 w-6 text-green-400" />,
		bgColor: "bg-green-900/20",
	},
	{
		id: "benefit-2",
		title: t("web3.benefits.benefit-2.title"),
		description: t("web3.benefits.benefit-2.description"),
		icon: <Link className="h-6 w-6 text-blue-400" />,
		bgColor: "bg-blue-900/20",
	},
	{
		id: "benefit-3",
		title: t("web3.benefits.benefit-3.title"),
		description: t("web3.benefits.benefit-3.description"),
		icon: <Users className="h-6 w-6 text-purple-400" />,
		bgColor: "bg-purple-900/20",
	},
	{
		id: "benefit-4",
		title: t("web3.benefits.benefit-4.title"),
		description: t("web3.benefits.benefit-4.description"),
		icon: <Key className="h-6 w-6 text-amber-400" />,
		bgColor: "bg-amber-900/20",
	},
	{
		id: "benefit-5",
		title: t("web3.benefits.benefit-5.title"),
		description: t("web3.benefits.benefit-5.description"),
		icon: <Lightbulb className="h-6 w-6 text-cyan-400" />,
		bgColor: "bg-cyan-900/20",
	},
];
