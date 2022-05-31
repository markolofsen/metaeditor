import React from 'react'

// ui
import { jss } from 'pixel-streaming'
import Button from 'rsuite/Button'
import Dropdown from 'rsuite/Dropdown'



const useStyles = jss({
  root: {
    position: 'fixed',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  }
})


// https://github.com/markolofsen/metaeditor/tree/dev-v1-(OLD)/src/pages.views/player/ContentProperty/context/useCommands/client/layers

const units_ids = [
  '244704-F26-toronto-2-67-2',
  '244694-F26-toronto-2-65-2',
  '244697-F25-toronto-2-66-1',
  '244698-F27-toronto-2-66-3',
  '244688-F27-toronto-2-64-3',
].map(item => item.replace('toronto-2', 'ty1'))

const TorontoActions = () => {
  const classes = useStyles()

  const commands = new class {
    emit(body: {}) {
      window.RTCPlayer.ueDescriptorUi.emit(JSON.stringify(body))
    }

    buildingOverview() {
      const body = {
        type: 'building_overview',
        value: {
          slug: 'ty1',
        }
      }
      this.emit(body)
    }

    unitSearchOverview() {
      const body = {
        type: 'unit_search_overview',
        value: {}
      }
      this.emit(body)
    }

    filteredUnits() {
      const body = {
        type: 'filtered_units',
        value: {
          units_slugs: units_ids,
        }
      }
      this.unitSearchOverview()
      this.emit(body)
    }

    moveCameraToApartment() {
      const body = {
        type: 'move_camera_to_apartment',
        value: {
          slug: units_ids[0],
        }
      }
      this.emit(body)
    }

    changeDayTime(hour: number) {
      const body = {
        type: 'change_day_time',
        value: {
          hour,
        }
      }
      this.emit(body)
    }

    enterApartment(slug: string) {
      const body = {
        type: 'enter_apartment',
        value: {
          slug,
        }
      }
      this.emit(body)
    }

    amenitiesOverview() {
      const body = {
        type: 'amenities_overview',
        value: {
          slug: ''
        }
      }
      this.emit(body)
    }
    enterAmenity(slug: string) {
      const body = {
        type: 'enter_amenity',
        value: {
          slug: slug,
        }
      }
      this.emit(body)
    }
  }


  const renderList = () => {

    const apartments = units_ids.map((slug, index) => ({
      label: 'Apartment ' + (index + 1),
      onClick: () => {
        commands.enterApartment(slug)
      }
    }))

    const amenities = [
      ['ty1-juicebar'],
      ['ty1-cinema'],
      ['ty1-gym'],
    ].map(([slug], index) => ({
      label: 'Amenity ' + slug.split('-')[1],
      onClick: () => {
        commands.enterAmenity(slug)
      }
    }))



    const lighting = [
      ['Morning', 7],
      ['Day', 12],
      ['Evening', 18],
      ['Night', 0]
    ].map(([label, int]: any, index) => ({
      label,
      onClick: () => {
        commands.changeDayTime(int)
      }
    }))


    return (
      <div className={classes.actions}>

        <Dropdown title="Apartments" placement="topStart">
          <Dropdown.Item onClick={() => commands.buildingOverview()}>
            Building Overview
          </Dropdown.Item>

          <Dropdown.Item onClick={() => commands.filteredUnits()}>
            Filtered units
          </Dropdown.Item>

          <Dropdown.Item onClick={() => commands.moveCameraToApartment()}>
            Move Camera To Apartment
          </Dropdown.Item>

          {apartments.map((item, index) => (
            <Dropdown.Item key={index} onClick={() => item.onClick()}>
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown>

        <Dropdown title="Amenities" placement="topStart">
          <Dropdown.Item onClick={() => commands.amenitiesOverview()}>
            Amenities Overview
          </Dropdown.Item>

          {amenities.map((item, index) => (
            <Dropdown.Item key={index} onClick={() => item.onClick()}>
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown>

        <Dropdown title="Lighting" placement="topStart">
          {lighting.map((item, index) => (
            <Dropdown.Item key={index} onClick={() => item.onClick()}>
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown>



      </div>
    )
  }

  return (
    <div className={classes.root}>

      {renderList()}

    </div>
  )
}

export default TorontoActions