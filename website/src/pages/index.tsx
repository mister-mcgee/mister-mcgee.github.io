import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './index.module.css';
import NutsAndBolts from '../components/NutsAndBolts';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* <div style={{fontSize: "6em"}}>
          🥸
        </div> */}
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>        
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <NutsAndBolts />
        <img src="img/logo.png" width={128} style={{borderRadius: "1em"}} className="item shadow--tl"/>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}
