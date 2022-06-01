/* eslint-disable complexity */
/* eslint-disable react/prop-types */

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import { Icon } from 'design-react-kit';

import '../i18n';
import { CollapsableList } from '../components/CollapsableList';
import { TagList } from '../components/TagList';

// eslint-disable-next-line max-lines-per-function,arrow-body-style
const Software = ({ data: { softwareYaml: software } }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container page-software-detail">
        <div className="row intro">
          <div className="col-md-7">
            <div className="intro-name">
              <img alt="" src={software.publiccode.logo} className="d-inline-block" />
              <h1 className="d-inline-block">
                {software.publiccode.name}
                <span className="badge badge-pill badge-pill--sup badge-primary">
                  {software.publiccode.softwareVersion}
                </span>
              </h1>
              <div className="abstract-software">
                <h2>
                  {software.publiccode.isBasedOn && (
                    <>
                      <br />
                      <span className="abstract-software__variant">
                        {t('software.variant_by')}
                        {software.publiccode.legal.repoOwner}
                      </span>
                    </>
                  )}
                </h2>
                <h3 className="color-content font-serif my-2 my-md-4">
                  {software.publiccode.description.it.shortDescription}
                </h3>
                <div className="my-3">
                  <ul className="home-software-tags__list list-inline">
                    <TagList tags={software.publiccode.categories} visibleCount={3} />
                  </ul>
                </div>
                <div className="row legal-main-info">
                  <div className="col-sm">
                    <p>
                      <span className="label">{t('software.published_by')} </span>
                      {software.publiccode.legal.repoOwner}
                    </p>
                  </div>

                  {software.publiccode.maintenance.type === 'contract' &&
                    software.publiccode.maintenance.contractors?.length > 0 && (
                      <div className="col-sm">
                        <p>
                          <span className="label">{t('software.software_maintained_by')} </span>
                          {software.publiccode.maintenance.contractors.map((c) => {
                            c.website ? <a href={c.website}>{c.name}</a> : c.name;
                          })}
                        </p>
                      </div>
                    )}

                  {software.publiccode.maintenance.contacts && (
                    <div className="col-sm">
                      <p>
                        <span className="label">
                          {t('software.technical_contact', { count: software.publiccode.maintenance.contacts.length })}
                        </span>
                        {software.publiccode.maintenance.contacts.map((contact) => {
                          if (contact.email) {
                            return (
                              <>
                                <a href={`mailto:${contact.email}`}>{contact.name}</a>
                                {contact.phone}
                              </>
                            );
                          }
                          return (
                            <>
                              {contact.name}
                              {contact.phone}
                            </>
                          );
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="offset-md-1 col-md-4 ">
            <div className="drops-details">
              <div className="vitality-score">
                <p>{t('software.vitality')}:</p>
                <p className="score d-inline-block"> {/* {{ page.vitalityScore }} */}%</p>
                {/* {% if page.vitalityDataChart != nil %} */}
                <div id="softwareChart" data-vitality="{/* {{page.vitalityDataChart | reverse | jsonify}} */}">
                  <canvas id="vitalityChart"></canvas>
                </div>
                {/* {% endif %} */}
                <div className="info-block d-inline-block">
                  <span className="info-block__icon">i</span>
                  <div className="info-block__msg font-serif">{/* {{t.software.tooltip | markdownify}} */}</div>
                </div>
                <div className="status-developement">
                  <p>{`${t('software.development_status')}: ${software.publiccode.developmentStatus}`}</p>
                </div>
              </div>
            </div>

            <div className="drops-details">
              {software.publiccode.landingURL && (
                <div className="goto">
                  <p>
                    <a
                      href={software.publiccode.landingURL}
                      aria-label={t('software.goToLandingUrlAriaLabel')}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img alt="" src="/assets/icons/software_icons/it-link.svg" />
                      {t('software.goToLandingUrl')} &rarr;
                    </a>
                  </p>
                </div>
              )}

              {software.publiccode.description.it?.documentation && (
                <div className="goto doc">
                  <p>
                    <a href={software.publiccode.description.it?.documentation}>
                      <img alt="" src="/assets/icons/software_icons/it-documentazione.svg" />
                      {t('software.goToDocumentation')} &rarr;
                    </a>
                  </p>
                </div>
              )}

              <div className="goto code">
                <p>
                  <a href={software.publiccode.url}>
                    {' '}
                    <img alt="" src="/assets/icons/software_icons/it-codice.svg" />
                    {t('software.goToCode')} &rarr;
                  </a>
                </p>
              </div>

              {software.publiccode.roadmap && (
                <div className="goto road">
                  <p>
                    <a href={software.publiccode.roadmap}>
                      <img alt="" src="/assets/icons/software_icons/it-roadmap.svg" />
                      {t('software.goToRoadmap')} &rarr;
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {% if description.screenshots.size > 0 or description.videos > 0 %} */}
      {/* {% include tiled-gallery.html screenshots=description.screenshots videos=description.videos oembed=page.oEmbedHTML %} */}
      {/* {% endif %} */}
      <hr className="divider mb-0" />

      <div className={software.oldVariant ? 'container' : 'container-fluid'}>
        <div className="functionality">
          {software.oldVariant && (
            <>
              <h2 className="mt-2 mt-md-5"> {t('software.functionality')} </h2>
              <div className="sw-separator-arrows d-none d-md-block"></div>
            </>
          )}
          <div className="row {/* {% if page.oldVariant.size == nil %} first {% endif %} */}">
            {/* {% if page.oldVariant.size == nil %} */}
            <div className="col-md-6 software-ill"></div>
            {/* {% endif %} */}
            {/* {% if page.publiccode.isBasedOn != nil %} */}
            <div className="col-xs-5 col-md-5 col-lg-4 variant">
              <div className="{/* {% if page.oldVariant.size == nil %}mx-md-4 px-md-4 my-2 my-md-4{%endif%} */}">
                {/* {% if page.oldVariant.size == nil %} */}
                <h2> {t('software.functionality')} </h2>
                {/* {% else %} */}
                <h4> {t('software.functionality_this_variant')} </h4>
                {/* {% endif %} */}

                {software.publiccode.description.it?.features && (
                  <div className="function-list">
                    {software.publiccode.description.it?.features.map((feat, i) => (
                      <p key={i}>{feat}</p>
                    ))}
                  </div>
                )}

                {software.publiccode.usedBy?.length> 0 && (
                  <div id="usedBy">
                    <a
                      data-toggle="collapse"
                      href="#by-amministration"
                      role="button"
                      aria-expanded="false"
                      aria-controls="by-amministration"
                      className="count"
                    >
                      {t('software.used_by')}
                      {/* {% if page.publiccode.usedBy.size >= 1 %} */}
                      {t('software.administrations')}
                      {/* {% else %} */}
                      {t('software.administration')}
                      {/* {% endif %} */}
                      <span className="or it-expand"></span>
                      <span className="and it-collapse"></span>
                    </a>
                    <div className="collapse" id="by-amministration">
                      {/* {% for item in page.publiccode.usedBy %} */}
                      <p> {/* {{ item | escape}} */} </p>
                      {/* {% endfor %} */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* {% if page.oldVariant.size != nil %} */}
            <div className="col-xs-2 col-md-2 col-lg-4"></div>
            <div className="col-xs-5 col-md-5 col-lg-4 variant">
              <h4> {t('software.functionality_other_variant')} </h4>
              <div className="function-list">
                {software.oldFeatures && <CollapsableList items={software.oldFeatures} visibleCount={10} />}
              </div>
              <div id="oldVariant">
                <a
                  data-toggle="collapse"
                  href="#listVariant"
                  role="button"
                  aria-expanded="false"
                  aria-controls="listVariant"
                  className="count"
                >
                  {/* {{ page.oldVariant | size }} */}
                  {/* {% if page.oldVariant.size > 1 %} */}
                  {t('software.variants_present')}
                  {/* {% else %} */}
                  {t('software.variant_present')}
                  {/* {% endif %} */}
                  <span className="or it-expand"></span>
                  <span className="and it-collapse"></span>
                </a>
                <div className="collapse" id="listVariant">
                  {/* {% for variant in page.oldVariant %} */}
                  {/* {% assign variant_sw = site.data.crawler.softwares | where: "id", variant.id | first %} */}
                  {/* % assign variant_description = variant.publiccode.description[active_lang]

                  | default: variant.publiccode.description.en
                  | default: variant.publiccode.description.it % */}
                  <div className="variantDetail">
                    <a href="/{/* {{active_lang}}/software/{{ variant.slug | downcase }} */}">
                      {/* {{ variant.publiccode.name }} */}
                    </a>
                    {t('software.variant_by')}
                    <p>
                      <span className="label">
                        {t('software.vitality')}:{/* {{ variant_sw.vitalityScore }} */}%
                      </span>
                    </p>
                  </div>
                  {/* {% endfor %} */}
                </div>
              </div>
            </div>
            {/* {% endif %} */}
            {/* {% else %} */}

            {/* <!-- Funzionalità sw when single block with side img--> */}
            <div className="col-md-6 variant">
              <div className={software.oldVariant && 'mx-md-4 px-md-4 my-2 my-md-4'}>
                {/* {% if page.oldVariant.size != nil %} */}
                <h2> {t('software.functionality_this_variant')} </h2>
                {/* {% else %} */}
                <h2> {t('software.functionality')} </h2>
                {/* {% endif %} */}
                <div className="function-list">
                  {software.publiccode.description.it?.features && (
                    <CollapsableList items={software.publiccode.description.it?.features} visibleCount={10} />
                  )}
                </div>
                {software.publiccode.usedBy?.size > 0 && (
                  <div id="usedBy">
                    <a
                      data-toggle="collapse"
                      href="#by-amministration"
                      role="button"
                      aria-expanded="false"
                      aria-controls="by-amministration"
                      className="count"
                    >
                      {t('software.used_by')}
                      {t('software.administration', { count: software.publiccode.usedBy.length })}
                      <span className="or it-expand"></span>
                      <span className="and it-collapse"></span>
                    </a>
                    <div className="collapse" id="by-amministration">
                      {software.publiccode.usedBy.map((by, i) => (
                        <p key={i}>{by}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {software.publiccode.intendedAudience?.scope && (
        <div className="container">
          <div className="tags-relate text-center">
            <strong>{t('software.intended_audience')}</strong>
            <TagList tags={software.publiccode.intendedAudience.scope} visibleCount={10} />
          </div>
        </div>
      )}

      <div className="detail-sheet">
        <div className="container sheet">
          <div className="top"></div>
          <div className="content-sheet">
            <div className="row justify-content-center ">
              <div className="col-10 col-sm-10">
                <div className="heading-title">
                  <p>{t('software.detailed_info')} </p>
                  <div className="title">
                    <h2 className="h1">
                      {/* {{ sw_name | escape }} */}
                      {/* {% if page.publiccode.softwareVersion %} */}
                      <span className="badge badge-pill badge-pill--sup badge-primary">
                        {/* {{ page.publiccode.softwareVersion }} */}
                      </span>
                      {/* {% endif %} */}
                    </h2>
                    <h2>{/* {{ description.genericName | escape }} */}</h2>
                  </div>
                </div>
                <div className="heading-maintenance">
                  <div className="row">
                    <div className="col-5 col-sm-5 col-md-2">
                      <p>
                        <span className="label">{t('software.last_release')}</span>
                        {software.publiccode.releaseDate}
                        {software.publiccode.softwareVersion}
                      </p>
                    </div>
                    <div className="col-7 col-sm-7 col-md-3">
                      <p>
                        <span className="label">{t('software.maintainance_type')}</span>
                        {/* {{ page.publiccode.maintenance.type }} */}
                      </p>
                    </div>
                    {/* {% if page.publiccode.maintenance.type == "contract" %} */}
                    {/* {% if page.publiccode.maintenance.contractors[0].name != nil %} */}
                    <div className="col-sm-12 col-md">
                      <p>
                        <span className="label">{t('software.contract_with')}</span>
                        {/* {% for contractor in page.publiccode.maintenance.contractors %} */}
                        {/* {% assign today_date = 'now' | date: '%s' %} */}
                        {/* {% assign contractor_date = contractor.until | date: '%s' %} */}
                        {/* {% if today_date > contractor_date %} */}
                        <Icon className="" color="" icon="it-warning" size="" />
                        <svg className="icon icon-sm icon-warning" role="img" aria-labelledby="software-support-ended">
                          <title id="software-support-ended">{t('software.contract_warning')}</title>
                          {/* <use xlink:href="/assets/svg/sprite.svg#it-warning-circle"></use> */}
                        </svg>
                        {/* {% endif %} */}
                        <span className="align-middle">
                          {/* {% if contractor.website != nil and contractor.website != "" %} */}
                          <a href="{{ contractor.website }}" className="until">
                            {/* { contractor.name }} */}
                          </a>
                          {t('software.until')}
                          {/* {% else %} */}
                          {t('software.until')}
                          {/* {% endif %} */}
                        </span>
                        {/* {% endfor %} */}
                      </p>
                    </div>
                    {/* {% endif %} */}
                    {/* {% endif %} */}
                  </div>
                </div>

                {software.publiccode.maintenance?.contacts?.length > 0 && (
                  <div className="heading-maintenance-contact">
                    <p className="d-none d-md-block">
                      <span className="label">
                        {t('software.technical_contact', { count: software.publiccode.maintenance.contacts.length })}
                      </span>
                    </p>
                    <a
                      data-toggle="collapse"
                      href="#maintenanceContact"
                      role="button"
                      aria-expanded="false"
                      aria-controls="maintenanceContact"
                      className="d-block d-md-none controls"
                    >
                      {t('software.technical_contact', { count: software.publiccode.maintenance.contacts.length })}
                      <span className="or it-expand"></span>
                      <span className="and it-collapse"></span>
                    </a>
                    <div id="maintenanceContact" className="collapse dont-collapse-md">
                      <div className="row">
                        {/* {% for contact in page.publiccode.maintenance.contacts %} */}
                        <div className="col-md">
                          <p>
                            {/* {% if contact.email != nil and contact.email != "" %} */}
                            <a href="mailto: {{ contact.email }}">{/* { contact.name }} */}</a>
                            {/* {% else %} */}
                            {/* {{ contact.name | escape }} */}
                            {/* {% endif %} */}
                            {/* {{ contact.phone }} */}
                          </p>
                        </div>
                        {/* {% endfor %} */}
                      </div>
                    </div>
                  </div>
                )}

                <div className="heading-legal-dependencies">
                  <div className="row">
                    <div className="col-6 col-md">
                      <p>
                        <span className="label">{t('software.license')}</span>
                        {software.publiccode.legal.license}
                      </p>
                    </div>
                    {software.publiccode.platforms?.length > 0 && (
                      <div className="col-6 col-md">
                        <p>
                          <span className="label">{t('software.platforms')}</span>
                          {/* {% for platform in page.publiccode.platforms %} */}
                          {/* {{ platform | escape }} */}
                          <br />
                          {/* {% endfor %} */}
                        </p>
                      </div>
                    )}

                    <div className="col-6 col-md">
                      <p>
                        <span className="label">{t('software.enabling_platforms')}</span>
                        {/* {% assign p = page.publiccode.it.piattaforme %} */}
                        {/* {% assign all_false = true %} */}
                        {/* {% for key in p %} */}
                        {/* {% if key.last == true %} */}
                        {/* {% assign all_false = false %} */}
                        {/* {% break %} */}
                        {/* {% endif %} */}
                        {/* {% endfor %} */}
                        {/* {% if all_false %} */}
                        {t('software.dependencies_none')}
                        {/* {% else %} */}
                        {/* {% if p.pagopa == true %} */}
                        <a href="/{/* {{ active_lang }} */}/pagopa" className="enabling_platforms">
                          pagoPA
                        </a>
                        {/* {% endif %} */}
                        {/* {% if p.spid == true %} */}
                        <a href="/{/* {{ active_lang }} */}/spid" className="enabling_platforms">
                          SPID
                        </a>
                        {/* {% endif %} */}
                        {/* {% if p.cie == true %} */}
                        <a href="/{/* {{ active_lang }} */}/cie" className="enabling_platforms">
                          CIE
                        </a>
                        {/* {% endif %} */}
                        {/* {% if p.io == true %} */}
                        <a href="/it/io" className="enabling_platforms">
                          App IO
                        </a>
                        {/* {% endif %} */}
                        {/* {% if p.anpr == true %} */}
                        <a href="/{/* {{ active_lang }} */}/anpr" className="enabling_platforms">
                          ANPR
                        </a>
                        {/* {% endif %} */}
                        {/* {% endif %} */}
                      </p>
                    </div>
                    <div className="col-6 col-md">
                      <p>
                        <span className="label">{t('software.compliance')}</span>
                        {/* {% assign p = page.publiccode.it.conforme %} */}
                        {/* {% assign all_false = true %} */}
                        {/* {% for key in p %} */}
                        {/* {% if key.last == true %} */}
                        {/* {% assign all_false = false %} */}
                        {/* {% break %} */}
                        {/* {% endif %} */}
                        {/* {% endfor %} */}
                        {/* {% if all_false %} */}
                        {t('software.dependencies_none')}
                        {/* {% else %} */}
                        {/* {% if p.gdpr == true %} */}
                        GDPR
                        {/* {% endif %} */}
                        {/* {% if p.lineeGuidaDesign == true %} */}
                        <a href="{t('software.design_guidelines_url')}" className="enabling_platforms">
                          {t('software.design_guidelines')}
                        </a>
                        {/* {% endif %} */}
                        {/* {% if p.misureMinimeSicurezza == true %} */}
                        <a href="{t('software.security_guidelines_url')}" className="enabling_platforms">
                          {t('software.security_guidelines')}
                        </a>
                        {/* {% endif %} */}
                        {/* {% if p.modelloInteroperabilita == true %} */}
                        <a href="{t('software.interoperability_model_url')}" className="enabling_platforms">
                          {t('software.interoperability_model')}
                        </a>
                        {/* {% endif %} */}
                        {/* {% endif %} */}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 col-md">
                      <p>
                        <span className="label">{t('software.dependencies_list')}</span>
                        {/* {% if page.publiccode.dependsOn == nil or page.publiccode.dependsOn.size == 0 %} */}
                        {t('software.dependencies_none')}
                        {/* {% else %} */}
                        {/* {% if page.publiccode.dependsOn.open.size > 0 %} */}
                        <span className="badge badge-pill badge-primary">{t('software.dependencies_oss')}</span>
                        <br />
                        {/* {% for dep in page.publiccode.dependsOn.open %} */}
                        {/* {% include dependency.html dependency=dep %} */}
                        <br />
                        {/* {% endfor %} */}
                        {/* {% endif %} */}
                        {/* {% if page.publiccode.dependsOn.proprietary.size > 0 %} */}
                        <span className="badge badge-pill badge-danger">{t('software.dependencies_proprietary')}</span>
                        <br />
                        {/* {% for dep in page.publiccode.dependsOn.proprietary %} */}
                        {/* {% include dependency.html dependency=dep %} */}
                        <br />
                        {/* {% endfor %} */}
                        {/* {% endif %} */}
                        {/* {% if page.publiccode.dependsOn.hardware.size > 0 %} */}
                        <span className="badge badge-pill badge-secondary">Hardware</span>
                        <br />
                        {/* {% for dep in page.publiccode.dependsOn.hardware %} */}
                        {/* {% include dependency.html dependency=dep %} */}
                        <br />
                        {/* {% endfor %} */}
                        {/* {% endif %} */}
                        {/* {% endif %} */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="main row">
                  <a
                    data-toggle="collapse"
                    href="#mainOthersInfo"
                    role="button"
                    aria-expanded="false"
                    aria-controls="mainOthersInfo"
                    className="d-block d-md-none controls"
                  >
                    {t('software.others_info')}
                    <span className="or it-expand"></span>
                    <span className="and it-collapse"></span>
                  </a>
                  <div id="mainOthersInfo" className="collapse col-md-3 dont-collapse-md">
                    {/* {% if page.publiccode.intendedAudience.onlyFor.size > 0 %} */}
                    <div className="other-detail">
                      <p>
                        <span className="label">{t('software.main_audience')}</span>
                        {/* {% for audience in page.publiccode.intendedAudience.onlyFor %} */}
                        {/* {% include set-audience.html label=audience %} */}
                        {/* {% endfor %} */}
                      </p>
                    </div>
                    {/* {% endif %} */}
                    {/* {% if page.publiccode.localisation.localisationReady == true %} */}

                    <div className="other-detail">
                      <p>
                        <span className="label">{t('software.supported_languages')}</span>
                        {/* {% if page.publiccode.localisation.availableLanguages.size > 10 %} */}
                        {/* {% for language in page.publiccode.localisation.availableLanguages limit: 10 %} */}
                        {/* {% include set-language-supported.html lang=language %} */}
                        {/* {% endfor %} */}
                      </p>
                      <p>
                        <a
                          data-toggle="collapse"
                          href="#otherLanguage"
                          role="button"
                          aria-expanded="false"
                          className="count"
                          aria-controls="otherLanguage"
                        >
                          {t('langs.show_all')}
                          <span className="or it-expand"></span>
                          <span className="and it-collapse"></span>
                        </a>
                      </p>
                      <div className="collapse" id="otherLanguage">
                        {/* {% for language in page.publiccode.localisation.availableLanguages offset: 10 %} */}
                        {/* {% include set-language-supported.html lang=language %} */}
                        {/* {% endfor %} */}
                      </div>

                      <p>
                        {/* {% else %} */}
                        {/* {% for language in page.publiccode.localisation.availableLanguages %} */}
                        {/* {% include set-language-supported.html lang=language %} */}
                        {/* {% endfor %} */}
                        {/* {% endif %} */}
                      </p>
                    </div>
                    {/* {% endif %} */}

                    {software.publiccode.description.it?.awards?.length > 0 && (
                      <div className="other-detail">
                        <p>
                          <span className="label">{t('software.awards')}</span>

                          {software.publiccode.description.it?.awards.map((award, i) => (
                            <p key={i}>{award}</p>
                          ))}
                        </p>
                      </div>
                    )}

                    {software.publiccode.description.it?.apiDocumentation && (
                      <div className="other-detail">
                        <p>
                          <span className="label">{t('software.api_documentation')}</span>
                          <a href={software.publiccode.description.it.apiDocumentation}> API</a>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="col-md-8 col-offset-md-1 page-detail">
                    <p className="title">{t('software.extende_description')}</p>
                    {/*
                      * Use data-proofer-ignore to make html-proofer ignore this section for now:
                      * it comes from external publiccode.yml files so there might be broken links
                      * out of our control making our CI pipeline fail.

                      * TODO: find a better solution
                    */}
                    <div className="font-serif page-detail__text" data-proofer-ignore>
                      <ReactMarkdown>{software.publiccode.description.it?.longDescription}</ReactMarkdown>
                      {software.publiccode.description.it?.longDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query ($id: String!) {
    softwareYaml(id: { eq: $id }) {
      publiccode {
        name
        url
        landingURL
        logo
        releaseDate
        roadmap
        softwareVersion
        categories
        intendedAudience {
          scope
        }
        legal {
          repoOwner
          license
        }
        description {
          it {
            shortDescription
            longDescription
            apiDocumentation
            awards
            documentation
            features
          }
        }
        maintenance {
          contacts {
            name
            email
            phone
          }
        }
        isBasedOn
      }
    }
  }
`;

export default Software;
