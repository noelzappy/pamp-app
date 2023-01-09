import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Share,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useInfiniteQuery, useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLazyGetVendorQuery, vendorApi } from '@/Services/modules/vendor'
import { displayError } from '@/Utils/errors'
import { Badge, Icon, ListItem, Button } from '@rneui/base'
import { width } from '@/Utils/dimensions'
import { Pills, Spacer, StaffList, VendorCarousel } from '@/Components'
import { getDuration, getVendorOpenStatus } from '@/Utils/misc'
import { Config } from '@/Config'

const Container = ({ route, navigation }) => {
  const { vendorId } = route.params || {}

  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const [getVendor, { data: vendor, isLoading, isFetching, error }] =
    useLazyGetVendorQuery()

  const services = useInfiniteQuery(vendorApi.endpoints.getVendorServices, {
    vendor: vendorId,
  })

  const staffs = useInfiniteQuery(vendorApi.endpoints.getVendorStaffs, {
    vendor: vendorId,
  })

  const [selectedService, setSelectedService] = useState(null)
  const [selectedStaff, setSelectedStaff] = useState(null)

  const onRefresh = () => {
    getVendor(vendorId)
    services.refetch()
    staffs.refetch()
  }

  const onBook = () => {
    if (!selectedService || !vendor) return

    const params = {
      vendor,
      selectedService,
      selectedStaff,
    }

    navigation.navigate('BookingDate', params)
  }

  useEffect(() => {
    if (vendorId) {
      getVendor(vendorId)
    }
  }, [vendorId, getVendor])

  useEffect(() => {
    if (error) {
      displayError(error)
    }
  }, [error])

  return (
    <SafeAreaView style={[Layout.fill, Common.backgroundLight]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              isFetching || isLoading || services.isLoading || staffs.isLoading
            }
            onRefresh={() => onRefresh()}
          />
        }
      >
        <View>
          <View
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
              Gutters.regularHPadding,
              {
                position: 'absolute',
                top: 0,
                width: width(100),
                zIndex: 100,
              },
              Gutters.smallTMargin,
            ]}
          >
            <Icon
              name="chevron-back"
              type="ionicon"
              size={30}
              color={Colors.light}
              onPress={() => navigation.goBack()}
            />
            <Icon
              name="hearto"
              size={20}
              color={Colors.light}
              type="antdesign"
            />
          </View>
          {vendor && <VendorCarousel vendor={vendor} />}
        </View>
        <Spacer size={15} />
        <View style={[Gutters.regularHPadding, Gutters.largeTMargin]}>
          <View
            style={[
              Layout.row,
              Layout.alignItemsCenter,
              Layout.justifyContentBetween,
            ]}
          >
            <Text style={[Fonts.textRegular, Fonts.textLeft, Common.text.bold]}>
              {vendor?.name}{' '}
              <Badge
                value={getVendorOpenStatus(vendor)}
                status={
                  getVendorOpenStatus(vendor) === 'Open' ? 'success' : 'error'
                }
              />
            </Text>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  message: `Check out ${vendor?.name} on Pamp App`,
                })
              }}
            >
              <Icon name="sharealt" type="antdesign" size={25} />
            </TouchableOpacity>
          </View>
          <Spacer size={10} />
          <Pills
            pillItems={vendor?.tags?.map(item => ({
              title: item,
              onPress: () => {},
            }))}
            activeItem="all"
            disabled
          />

          <Spacer size={15} />

          <Text
            style={[
              Fonts.textRegular,
              {
                color: Colors.accent,
              },
            ]}
          >
            {vendor?.address}
          </Text>
          <Spacer size={10} />

          <TouchableOpacity style={[Layout.row]}>
            <Icon name="location" type="evilicon" color={Colors.primary} />
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textLeft,
                Common.text.bold,
                {
                  color: Colors.primary,
                },
              ]}
            >
              230m from you - Show on map
            </Text>
          </TouchableOpacity>

          <Spacer size={15} />

          <Text style={[Fonts.textSmall]}>{vendor?.description}</Text>

          <Spacer size={20} />

          <Text
            style={[
              Fonts.textLarge,
              Fonts.textLeft,
              {
                color: Colors.accent,
              },
            ]}
          >
            Services
          </Text>
          {services.data?.map((item, index) => {
            return (
              <ListItem
                key={item.id}
                bottomDivider
                Component={TouchableOpacity}
                containerStyle={[
                  Common.backgroundLight,
                  {
                    borderBottomColor: Colors.primary,
                  },
                ]}
                onPress={() => {
                  setSelectedService(item.id)
                }}
              >
                <ListItem.CheckBox
                  checked={selectedService === item.id}
                  containerStyle={[Common.backgroundLight]}
                  uncheckedColor={Colors.primary}
                  checkedColor={Colors.primary}
                  onPress={() => {
                    setSelectedService(item.id)
                  }}
                  checkedIcon={
                    <Icon
                      name="check-square"
                      type="font-awesome"
                      color={Colors.primary}
                    />
                  }
                />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>

                  <ListItem.Subtitle
                    style={[
                      Fonts.textSmall,
                      Fonts.textLeft,
                      {
                        color: Colors.textLight,
                      },
                    ]}
                  >
                    {getDuration(item.duration)}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <View>
                  <ListItem.Title
                    style={[
                      Fonts.textRegular,
                      {
                        color: Colors.accent,
                      },
                    ]}
                  >
                    {Config.CURRENCY} {item.price}
                  </ListItem.Title>
                </View>
              </ListItem>
            )
          })}

          <Spacer size={20} />
          <View>
            <Text
              style={[
                Fonts.textRegular,
                Fonts.textLeft,
                {
                  color: Colors.accent,
                },
              ]}
            >
              Booking with staff
            </Text>
            <Text
              style={[
                Fonts.textSmall,
                Fonts.textLeft,
                {
                  color: Colors.textLight,
                },
              ]}
            >
              Optional
            </Text>
          </View>

          <Spacer size={10} />

          <StaffList
            staffs={staffs?.data || []}
            onPress={item => {
              setSelectedStaff(item.id)
            }}
            selectedId={selectedStaff}
          />
        </View>
      </ScrollView>
      <View style={[Layout.center, Gutters.smallVPadding]}>
        <Button
          title="Book"
          onPress={onBook}
          buttonStyle={[
            Common.button.large,
            {
              height: 50,
            },
          ]}
          disabled={selectedService === null}
        />
      </View>
    </SafeAreaView>
  )
}

export default Container
