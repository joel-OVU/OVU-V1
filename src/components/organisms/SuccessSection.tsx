import { success } from "@/src/content/en";
import { successStyles as xs, caseStudySpans } from "@/src/styles/success";
import { styles } from "@/src/styles/shared";
import StatBlock from "@/src/components/atoms/StatBlock";
import CaseStudyCard from "@/src/components/molecules/CaseStudyCard";

export default function SuccessSection() {
  return (
    <section id="success" className={xs.section}>
      <div className={styles.container}>
        <div className={xs.header}>
          <div className={xs.headerContent}>
            <h2 className={xs.heading}>
              {success.heading.replace(" local businesses.", "")} <br />
              local businesses.
            </h2>
            <p className={xs.description}>{success.description}</p>
          </div>
          <div className={xs.statsGroup}>
            {success.stats.map((stat, i) => (
              <div key={i} className={i > 0 ? "flex items-center gap-4" : ""}>
                {i > 0 && <div className={xs.statDivider} />}
                <StatBlock value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>

        <div className={xs.grid}>
          {success.caseStudies.map((cs, i) => (
            <CaseStudyCard
              key={cs.id}
              id={cs.id}
              className={caseStudySpans[i]}
              image={cs.image}
              title={cs.title}
              metric={cs.metric}
              description={cs.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
