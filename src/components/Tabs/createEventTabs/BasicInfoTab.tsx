import React, { useEffect, useState } from 'react'
import { ErrorMessage, Field, FormikProvider } from 'formik'
import * as yup from 'yup'
import Select from 'react-select'
import classNames from 'classnames'
import { useFormik } from 'formik'

import { CREATE_EVENT } from '../../../constants/routes'

import {
  useGetEventClassificationsQuery,
  useLazyGetAssetTypesQuery,
  useLazyGetAssetClassificationsQuery
} from '../../../features/api/eventsApiSlice'

export default function BasicInfoTab({
  setNavState,
  handleOptionSelect,
  selectedOptions
}: {
  setNavState: any
  handleOptionSelect: any
  selectedOptions: any
}) {
  const { data: eventsClassifications } = useGetEventClassificationsQuery()
  const [getAssetClassifications] = useLazyGetAssetClassificationsQuery()
  const [getAssetTypes] = useLazyGetAssetTypesQuery()

  const [assetTypes, setAssetTypes] = useState([])
  const [assetClassification, setAssetClassification] = useState([])
  const [assetTypevalues, setAssetTypeValues] = useState([])
  const [assetClassificationvalues, setAssetClassificationvalues] = useState([])

  const basicInfoSchema = yup.object().shape(
    {
      sellingFor: yup.string().required('* Please choose a selling type.'),
      assetSellingTypeId: yup.string().when('sellingFor', {
        is: 'Company',
        then: yup.string().required('* Please choose a asset selling type.')
      }),
      adjudicatingAuthority: yup.string().when('sellingFor', {
        is: 'Company',
        then: yup.string().required('* Please choose a selling Authority.')
      }),
      assetTypeIds: yup
        .array()
        .min(1, '* Select atleast one asset type from list.')
        .required('* Select a asset type from list.'),
      assetClassificationIds: yup
        .array()
        .min(1, '* Select atleast one asset classification from list.')
        .required('* Select a asset classification from list.')
    },
    [
      ['assetSellingTypeId', 'assetSellingTypeId'],
      ['adjudicatingAuthority', 'adjudicatingAuthority']
    ]
  )

  const formikProps = useFormik({
    initialValues: selectedOptions,
    validationSchema: basicInfoSchema,
    onSubmit: (data) => {
      handleOptionSelect((currValues: any) => {
        return { ...currValues, ...data }
      })
      setNavState(CREATE_EVENT.EVENT_DETAILS)
    }
  })

  useEffect(() => {
    getAssetTypes()
      .unwrap()
      .then((data) => {
        setAssetTypes(data)
        if (selectedOptions.assetTypeIds.length > 0)
          setAssetTypeValues(
            data?.filter((asset: any) => selectedOptions.assetTypeIds?.includes(asset.id))
          )
      })
    getAssetClassifications()
      .unwrap()
      .then((data) => {
        setAssetClassification(data)
        if (selectedOptions.assetClassificationIds.length > 0)
          setAssetClassificationvalues(
            data?.filter((assert: any) =>
              selectedOptions.assetClassificationIds?.includes(assert.id)
            )
          )
      })
  }, [])

  return (
    <div id="basic_info" className="create_event_tabcontent w-inherit">
      <div className="row">
        <FormikProvider value={formikProps}>
          <form onSubmit={formikProps.handleSubmit}>
            <div className="col-12 col-md-12 col-xl-12">
              <div className="row d-flex justify-content-center mt-xl-3">
                <div className="col-12 col-md-12 col-xl-8 text-center text-xl-start">
                  <p className="h6">I am selling assets as</p>
                </div>
                <div className="col-12 col-md-12 col-xl-8 text-center text-md-center text-xl-start px-md-5 px-xl-1">
                  <div className="row px-lg-5 px-xl-0">
                    <div className="col-12 col-md-6 col-xl-3 my-1">
                      <Field
                        as="div"
                        className={classNames({
                          'p-3 border border-dark shadow-none h-100 w-100 fs-6 fw-normal text-xl-start mx-md-1':
                            true,
                          asset_but: formikProps.values.sellingFor === 'Personal'
                        })}
                        name="sellingFor"
                        id="sellingFor"
                        onClick={() => formikProps.setFieldValue('sellingFor', 'Personal')}
                      >
                        Personal (Individual)
                      </Field>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 my-1">
                      <Field
                        as="div"
                        className={classNames({
                          'p-3 border border-dark shadow-none h-100 w-100 fs-6 fw-normal text-xl-start mx-md-1':
                            true,
                          asset_but: formikProps.values.sellingFor === 'Company'
                        })}
                        name="sellingFor"
                        id="sellingFor"
                        onClick={() => formikProps.setFieldValue('sellingFor', 'Company')}
                      >
                        Company
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
              {formikProps.values.sellingFor === 'Company' && (
                <>
                  <div className="row d-flex justify-content-center mt-xl-3">
                    <div className="col-12 col-md-12 col-xl-8 text-center text-xl-start">
                      <p className="h6">Assets will be sold under framework</p>
                    </div>
                    <div className="col-12 col-md-12 col-xl-8 text-center text-md-center text-xl-start px-md-5 px-xl-1">
                      <div className="row px-lg-5 px-xl-0">
                        {eventsClassifications?.data?.map(
                          ({ assertId, assertName }: { assertId: number; assertName: string }) => (
                            <div key={assertId} className="col-12 col-md-6 col-xl-3 my-1">
                              <Field
                                as="div"
                                className={classNames({
                                  'p-3 border border-dark shadow-none h-100 w-100 fs-6 fw-normal text-xl-start mx-md-1':
                                    true,
                                  asset_but: formikProps.values.assetSellingTypeId === assertId
                                })}
                                name="assetSellingTypeId"
                                id="assetSellingTypeId"
                                onClick={() =>
                                  formikProps.setFieldValue('assetSellingTypeId', assertId)
                                }
                              >
                                {assertName}
                              </Field>
                            </div>
                          )
                        )}
                        <ErrorMessage
                          name="assetSellingTypeId"
                          component="div"
                          className="text-danger ps-3 pt-2 text-xs italic"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center mt-xl-3">
                    <div className="col-12 col-xl-8 text-center text-xl-start">
                      <p className="h6">The Adjudicating Authority shall be</p>
                    </div>
                    <div className="col-12 col-xl-8 text-center text-xl-start">
                      <div className="row">
                        <div className="col-12 col-md-6 col-xl-5 my-1 text-xl-start text-md-end">
                          <Field
                            as="div"
                            className={classNames({
                              'p-3 border border-dark shadow-none h-100 w-100 fs-6 fw-normal text-xl-start mx-md-1':
                                true,
                              asset_but: formikProps.values.adjudicatingAuthority === 'NCLT'
                            })}
                            name="adjudicatingAuthority"
                            id="adjudicatingAuthority"
                            onClick={() =>
                              formikProps.setFieldValue('adjudicatingAuthority', 'NCLT')
                            }
                          >
                            NCLT (National Company Law Tribunal)
                          </Field>
                        </div>

                        <div className="col-12 col-md-6 col-xl-5 my-1 text-md-start text-xl-start">
                          <Field
                            as="div"
                            className={classNames({
                              'p-3 border border-dark shadow-none h-100 w-100 fs-6 fw-normal text-xl-start mx-md-1':
                                true,
                              asset_but: formikProps.values.adjudicatingAuthority === 'DRT'
                            })}
                            name="adjudicatingAuthority"
                            id="adjudicatingAuthority"
                            onClick={() =>
                              formikProps.setFieldValue('adjudicatingAuthority', 'DRT')
                            }
                          >
                            DRT (Debt Recovery Tribunal)
                          </Field>
                        </div>
                        <ErrorMessage
                          name="adjudicatingAuthority"
                          component="div"
                          className="text-danger ps-3 pt-2 text-xs italic"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="row d-flex justify-content-center mt-xl-5 mt-md-5 mt-4">
                <div className="col-12 col-xl-8 text-center text-xl-start">
                  <p className="h6">Select Asset(s) types (upto 5)</p>
                </div>
                <div className="col-12 col-xl-8 text-center text-xl-start">
                  <div className="row">
                    <div className="col-12 col-md-6 col-xl-5 my-1 text-md-start text-xl-start">
                      <Select
                        name="assetTypeIds"
                        onChange={(assetTypes) => {
                          formikProps.setFieldValue(
                            'assetTypeIds',
                            assetTypes.map((t: any) => t.id)
                          )
                          setAssetTypeValues([...assetTypes])
                        }}
                        options={assetTypes}
                        isMulti
                        isOptionDisabled={() => formikProps.values.assetTypeIds.length >= 5}
                        value={assetTypevalues}
                      />
                      <ErrorMessage
                        name="assetTypeIds"
                        component="div"
                        className="text-danger ps-3 pt-2 text-xs italic"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center mt-xl-5 mt-md-5 mt-4">
                <div className="col-12 col-xl-8 text-center text-xl-start">
                  <p className="h6">Select Asset Classifications</p>
                </div>
                <div className="col-12 col-xl-8 text-center text-xl-start">
                  <div className="row">
                    <div className="col-12 col-md-6 col-xl-5 my-1 text-md-start text-xl-start">
                      <Select
                        name="assetClassificationIds"
                        options={assetClassification}
                        isMulti
                        onChange={(assetClassifications) => {
                          formikProps.setFieldValue(
                            'assetClassificationIds',
                            assetClassifications.map((t: any) => t.id)
                          )
                          setAssetClassificationvalues([...assetClassifications])
                        }}
                        value={assetClassificationvalues}
                      />
                      <ErrorMessage
                        name="assetClassificationIds"
                        component="div"
                        className="text-danger ps-3 pt-2 text-xs italic"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row d-flex justify-content-center mt-md-4 mt-4 mt-xl-4">
                <div className="col-12 col-xl-8 text-center text-xl-start">
                  <div className="row">
                    <div className="col-12 col-lg-5 col-md-5 text-lg-end text-xl-start col-xl-3 py-2 px-5 pe-xl-0 px-md-0 ps-md-3 ps-xl-3">
                      <button className="btn btn-lite border border-dark shadow-none w-100 fs-5 fw-bold text-center">
                        Cancel
                      </button>
                    </div>
                    <div className="col-12 col-lg-7 col-md-7 text-lg-start col-xl-5 py-2">
                      <button
                        className="btn btn-secondary shadow-none fs-5 w-100 fw-bold text-center"
                        type="submit"
                      >
                        Fill Event Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormikProvider>
      </div>
    </div>
  )
}
