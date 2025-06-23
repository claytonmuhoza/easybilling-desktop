'use client'

import { TextInput, Tooltip } from 'flowbite-react'
import { FC, useRef } from 'react'
import { HiArrowLeft, HiPlus, HiSearch } from 'react-icons/hi'
import { IoMdRefresh } from 'react-icons/io'
export function SearchBar({
  handdleSearch,
  title,
  className
}: {
  title?: string
  className?: string
  handdleSearch: (e: React.FormEvent<HTMLInputElement>) => void
}): JSX.Element {
  return (
    <TextInput
      className={'w-6/12 rounded-full ' + className}
      id="search"
      type="search"
      icon={HiSearch}
      autoComplete="off"
      onChange={(e) => handdleSearch(e)}
      placeholder={'Rechercher ' + title}
      required
    />
  )
}

export const BtnCreate = function ({
  name,
  noTitle,
  onClick
}: {
  name: string
  noTitle?: boolean
  onClick?: () => void
}): JSX.Element {
  return (
    <Tooltip content={name && name} style="auto">
      <div
        onClick={() => onClick && onClick()}
        aria-hidden="true"
        className="flex cursor-pointer items-center rounded-lg bg-primary p-2  text-slate-200"
      >
        <HiPlus />
        <span className="hidden md:inline">{!noTitle && (name ? name : 'Create')}</span>
      </div>
    </Tooltip>
  )
}
export function BtnRefresh({ onClick }: { onClick?: () => void }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  function spin(): void {
    ref.current?.classList.remove('animate-spin')
    return clearTimeout(
      setTimeout(() => {
        console.log(ref.current?.classList)
        ref.current?.classList.remove('animate-spin')
      })
    )
  }

  return (
    <Tooltip content="Refresh" style="auto">
      <div
        onClick={() => {
          spin()
          onClick && onClick()
        }}
        aria-hidden="true"
        className="flex cursor-pointer items-center rounded-lg bg-gray-700 p-2 text-slate-200"
      >
        <span ref={ref} className="">
          <IoMdRefresh className="material-icons-round cursor-pointer" />
        </span>
      </div>
    </Tooltip>
  )
}

interface BtnBackProps {
  handler?: () => void
}

export const BtnBack: FC<BtnBackProps> = function ({
  handler = (): void => window.history.back()
}) {
  return (
    <Tooltip content="Back" style="auto">
      <div
        //  onClick={() => console.log(11)}
        onClick={() => handler()}
        aria-hidden="true"
        className="flex cursor-pointer items-center rounded-lg bg-gray-700 p-2  text-slate-200"
      >
        <span className="material-icons-round  cursor-pointer ">
          <HiArrowLeft />
        </span>{' '}
        {/* Create */}
      </div>
    </Tooltip>
  )
}
