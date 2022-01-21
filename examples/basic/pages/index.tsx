import { MenuAim, Menu, SubMenuPanel } from '../src/index'

const Index = () => {
  return <MenuAim>
    <div className='menu'>
      <ul style={{ left: 10, top: 0 }}>
        {'ABCDEFG'.split('').map(x => <Menu key={x}>
          <li>
            <a>{x}</a>
            <SubMenuPanel>
              <ul>
                {'123456789'.split('').map(y => <Menu key={y}>
                  <li><a>{x + y}</a>
                    <SubMenuPanel>
                      <ul>
                        {'123456789'.split('').map(z => <Menu key={z}>
                          <li><a>{x + y + z}</a></li>
                        </Menu>)}
                      </ul>
                    </SubMenuPanel>
                  </li>
                </Menu>)}
              </ul>
            </SubMenuPanel>
          </li>
        </Menu>)}
      </ul>
      <style jsx global>{`
        ul {
          position: absolute;
          top: -1px;
          border: 1px solid black;
          width: 100px;
          padding-left: 30px;
          left: 131px;
          height: 200px;
        }
        .menu {
          height: 200px;
        }
    `}</style>
    </div>
  </MenuAim>
}

export default Index