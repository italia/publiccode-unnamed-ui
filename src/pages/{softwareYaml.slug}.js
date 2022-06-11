/* eslint-disable complexity */
/* eslint-disable react/prop-types */

import React from 'react';
import { createUseStyles } from 'react-jss';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { graphql } from 'gatsby';

import { Badge, Icon } from 'design-react-kit';

import '../i18n';
import { CollapsableList } from '../components/CollapsableList';
import { TagList } from '../components/TagList';

// eslint-disable-next-line max-lines-per-function,arrow-body-style
const Software = ({ data: { softwareYaml: software } }) => {
  const { t } = useTranslation();

  const useStyles = createUseStyles({
    imageGallery: {
      '& img.image-gallery-image': {
        height: '400px',
      },
    },
  });

  const classes = useStyles();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div>
              <img alt="" width={100} src={software.publiccode.logo} className="d-inline-block" />
              <h1 className="d-inline-block">{software.publiccode.name}</h1>
              <div>
                <h2>
                  {software.publiccode.isBasedOn && (
                    <>
                      <br />
                      <span>
                        {t('software.variant_by')}
                        {software.publiccode.legal.repoOwner}
                      </span>
                    </>
                  )}
                </h2>
                <h3 className="my-2 my-md-4">{software.publiccode.description.it.shortDescription}</h3>
                <div className="my-3">
                  <ul className="list-inline">
                    <TagList tags={software.publiccode.categories} visibleCount={3} />
                  </ul>
                </div>
                <div className="row">
                  {software.publiccode.legal.repoOwner && (
                    <div className="col-sm">
                      <div className="row">
                        <span className="label text-muted">{t('software.published_by')}</span>{' '}
                      </div>
                      <p className="row">{software.publiccode.legal.repoOwner}</p>
                    </div>
                  )}

                  {software.publiccode.maintenance.type === 'contract' &&
                    software.publiccode.maintenance.contractors?.length > 0 && (
                      <>
                        <span className="label">{t('software.software_maintained_by')} </span>
                        {software.publiccode.maintenance.contractors.map((c) => {
                          c.website ? (
                            <p>
                              <a href={c.website}>{c.name}</a>
                            </p>
                          ) : (
                            <p>{c.name}</p>
                          );
                        })}
                      </>
                    )}

                  {software.publiccode.maintenance.contacts && (
                    <div className="col-sm">
                      <div className="row label text-muted">
                        {t('software.technical_contact', { count: software.publiccode.maintenance.contacts.length })}
                      </div>{' '}
                      {software.publiccode.maintenance.contacts.map((contact) => {
                        if (contact.email) {
                          return (
                            <div className="row">
                              <a href={`mailto:${contact.email}`}>{contact.name}</a> {contact.phone}{' '}
                            </div>
                          );
                        }
                        return (
                          <>
                            {contact.name} {contact.phone}{' '}
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="offset-md-1 col-md-4 ">
            <div>
              {/* TODO vitality
              <div>
                <p>{t('software.vitality')}:</p>
                <p className="score d-inline-block"> {page.vitalityScore}%</p>
                <div id="softwareChart" data-vitality={page.vitalityDataChart}>
                  <canvas id="vitalityChart"></canvas>
                </div>
                <div className="info-block d-inline-block">
                  <span className="info-block__icon">i</span>
                  <div className="info-block__msg font-serif">{t.software.tooltip}</div>
                </div>
                <div className="status-developement">
                  <p>{`${t('software.development_status')}: ${software.publiccode.developmentStatus}`}</p>
                </div>
              </div>
              */}
            </div>

            <div className="pt-5 mt-5">
              {software.publiccode.landingURL && (
                <div>
                  <p>
                    <a
                      href={software.publiccode.landingURL}
                      aria-label={t('software.goToLandingUrlAriaLabel')}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icon icon="it-link" className="mr-2" />
                      <span className="font-weight-bold">{t('software.goToLandingUrl')} &rarr;</span>
                    </a>
                  </p>
                </div>
              )}

              {software.publiccode.description.it?.documentation && (
                <div>
                  <p>
                    <a href={software.publiccode.description.it?.documentation}>
                      <Icon icon="it-files" className="mr-2" />
                      <span className="font-weight-bold">{t('software.goToDocumentation')} &rarr;</span>
                    </a>
                  </p>
                </div>
              )}

              <div>
                <p>
                  <a href={software.publiccode.url}>
                    <Icon icon="it-code-circle" className="mr-2" />
                    <span className="font-weight-bold">{t('software.goToCode')} &rarr;</span>
                  </a>
                </p>
              </div>

              {software.publiccode.roadmap && (
                <div>
                  <p>
                    <a href={software.publiccode.roadmap}>
                      <Icon icon="it-chart-line" className="mr-2" />
                      <span className="font-weight-bold">{t('software.goToRoadmap')} &rarr;</span>
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {software.publiccode.description?.it.screenshots && (
        <div className={`my-5 col-5 offset-3 ${classes.imageGallery}`}>
          <ImageGallery
            items={software.publiccode.description?.it.screenshots.map((s) => ({ original: s, thumbnail: s }))}
            showPlayButton={false}
            showBullets={true}
            showFullscreenButton={false}
          />
        </div>
      )}

      {/* {% if description.screenshots.size > 0 or description.videos > 0 %} */}
      {/* {% include tiled-gallery.html screenshots=description.screenshots videos=description.videos oembed=page.oEmbedHTML %} */}
      {/* {% endif %} */}

      <hr className="divider mb-0" />

      {software.publiccode.intendedAudience?.scope && (
        <div className="container">
          <div className="tags-relate text-center">
            <strong>{t('software.intended_audience')}</strong>
            <TagList tags={software.publiccode.intendedAudience.scope} visibleCount={10} />
          </div>
        </div>
      )}

      <div>
        <div className="container">
          <div className="top"></div>
          <div className="content-sheet">
            <div className="row justify-content-center ">
              <div className="col-10 col-sm-10">
                <div>
                  <div className="row">
                    <div className="col-5 col-sm-5 col-md-2">
                      <div className="row text-muted">{t('software.last_release')}</div>
                      <div className="row">
                        {software.publiccode.releaseDate}
                        {software.publiccode.softwareVersion && `(${software.publiccode.softwareVersion})`}
                      </div>
                    </div>
                    <div className="col-7 col-sm-7 col-md-3">
                      <div className="row text-muted">{t('software.maintainance_type')}</div>
                      <div className="row">{software.publiccode.maintenance.type}</div>
                    </div>
                    {software.publiccode.maintenance.type === 'contract' &&
                      software.publiccode.maintenance.contractors && (
                        <div className="col-sm-12 col-md">
                          <div className="row text-muted">{t('software.contract_with')}</div>
                          <div className="row">
                            {software.publiccode.maintenance.contractors.map((contractor) => (
                              // <title id="software-support-ended">{t('software.contract_warning')}</title>
                              <>
                                {Date.now() > contractor.until && (
                                  <Icon className="" color="" icon="it-warning" size="" />
                                )}
                                <span className="align-middle">
                                  {contractor.website && <a href={contractor.website}>{contractor.name}</a>}
                                  {t('software.until')}
                                </span>
                              </>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <div>
                  <div className="row">
                    <div className="col-6 col-md">
                      <div className="row text-muted">{t('software.license')}</div>
                      <div className="row">{software.publiccode.legal.license}</div>
                    </div>
                    {software.publiccode.platforms?.length > 0 && (
                      <div className="col-6 col-md">
                        <div className="row text-muted">{t('software.platforms')}</div>
                        {software.publiccode.platforms.map((platform, i) => (
                          <div className="row" key={i}>
                            {platform}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-6 col-md">
                      <div className="row text-muted">{t('software.dependencies_list')}</div>
                      {!software.publiccode.dependsOn && t('software.dependencies_none')}
                      {software.publiccode.dependsOn?.open?.map((software, i) => (
                        <div className="row p-1" key={i}>
                          <Badge color="success">{t('software.dependencies_oss')}</Badge>{' '}
                          <span className="pl-1">
                            {software.name} {software.optional ? `(${t('software.dependencies_optional')})` : ''}
                          </span>
                        </div>
                      ))}
                      {software.publiccode.dependsOn?.hardware?.map((software, i) => (
                        <div className="row p-1" key={i}>
                          <Badge color="secondary">Hardware</Badge>{' '}
                          <span className="pl-1">
                            {software.name} {software.optional ? `(${t('software.dependencies_optional')})` : ''}
                          </span>
                        </div>
                      ))}
                      {software.publiccode.dependsOn?.proprietary?.map((software, i) => (
                        <div className="row p-1" key={i}>
                          <Badge color="danger">{t('software.dependencies_proprietary')}</Badge>{' '}
                          <span className="pl-1">
                            {software.name} {software.optional ? `(${t('software.dependencies_optional')})` : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row">
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
                      <div>
                        <p>
                          <span className="label">{t('software.api_documentation')}</span>
                          <a href={software.publiccode.description.it.apiDocumentation}> API</a>
                        </p>
                      </div>
                    )}
                  </div>
                  <h2>{t('software.extended_description')}</h2>
                  {/*
                    * Use data-proofer-ignore to make html-proofer ignore this section for now:
                    * it comes from external publiccode.yml files so there might be broken links
                    * out of our control making our CI pipeline fail.

                    * TODO: find a better solution
                  */}
                  <div data-proofer-ignore>
                    <ReactMarkdown>{software.publiccode.description.it?.longDescription}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="row first">
                <div className="col-md-6">
                  <div className="mx-md-4 px-md-4 my-2 my-md-4">
                    <h2> {t('software.functionality')} </h2>
                    <div className="function-list">
                      {software.publiccode.description.it?.features && (
                        <CollapsableList items={software.publiccode.description.it?.features} visibleCount={10} />
                      )}
                    </div>
                    {software.publiccode.usedBy?.size > 0 && (
                      <CollapsableList items={software.publiccode.usedBy} visibleCount={5} />
                    )}
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
        platforms
        releaseDate
        roadmap
        softwareVersion
        developmentStatus
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
            localisedName
            shortDescription
            longDescription
            apiDocumentation
            awards
            documentation
            features
            screenshots
          }
        }
        maintenance {
          type
          contacts {
            name
            email
            phone
          }
        }
        dependsOn {
          open {
            name
            optional
          }
          proprietary {
            name
            optional
          }
          hardware {
            name
            optional
          }
        }
        isBasedOn
      }
    }
  }
`;

export default Software;
