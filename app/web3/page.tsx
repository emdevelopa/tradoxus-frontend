"use client";

import { BenefitItem } from "@/components/web3/benefit-item";
import { FeatureCard } from "@/components/web3/feature-card";
import { benefits, features } from "@/lib/constants/web3";
import { useTranslation } from "react-i18next";

export default function Web3Integration() {
	const { t } = useTranslation();
	const featureItems = features(t);
	const benefitItems = benefits(t);
	return (
		<main className="transition-colors duration-200 bg-white dark:bg-gray-900">
			{/* Section 1: Web3 Integration in Tradoxus */}
			<section className="py-8 sm:py-12 lg:py-16">
				<div className="container px-4 mx-auto sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto mb-8 text-center sm:mb-10 lg:mb-12">
						<h2 className="mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl sm:mb-4 dark:text-white">
							{t("web3.sectionTitle")}
						</h2>
						<p className="text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg dark:text-gray-400">
							{t("web3.sectionSubtitle")}
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
						{featureItems.map((feature) => (
							<FeatureCard key={feature.id} {...feature} />
						))}
					</div>
				</div>
			</section>

			{/* Section 2: Why Web3 Matters in Crypto Education */}
			<section className="py-8 sm:py-12 lg:py-16 bg-gray-50 dark:bg-gray-800">
				<div className="container px-4 mx-auto sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto mb-8 text-center sm:mb-10">
						<h2 className="mb-3 text-xl font-bold t-gray-900 ledading-tight re bg- sm:text-2xl lg:text-3xl sm:mb-4 dark:text-white">
							{t("web3.whyWeb3Title")} 
						</h2>
						<p className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
							{t("web3.whyWeb3Subtitle")}
						</p>
					</div>

					<div className="max-w-4xl mx-auto">
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
							{benefitItems.map((benefit) => (
								<BenefitItem key={benefit.id} {...benefit} />
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
