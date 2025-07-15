

const MenuDropdown = ({openMenu}) => {
  return (
    <div className={`bg-black w-full h-screen top-0 fixed  transition-transform
        duration-300 left-0 ease-in-out ${!openMenu ? "-translate-y-full "
            : "translate-y-14 -translate-x-0"} transform`}>

    </div>
  )
}

export default MenuDropdown