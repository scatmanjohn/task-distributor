@import compass/css3

@function black($opacity)
  @return rgba(0,0,0,$opacity)

@function white($opacity)
  @return rgba(255,255,255,$opacity)

// keyframes mixin
=keyframes($name)
  @-webkit-keyframes #{$name}
    @content
  @-moz-keyframes #{$name}
    @content

*
  +box-sizing(border-box)

$tancolor: #D0B076
$linecolor: rgba(0,0,255,0.05)
$baseline: 24px

$gearbox-height: 150px

html
  height: 100%

body
  background: #333
  position: relative
  height: 100%
  margin: 0px

+keyframes(clockwise)
  0%
    +transform(rotate(0deg))

  100%
    +transform(rotate(360deg))

+keyframes(counter-clockwise)
  0%
    +transform(rotate(0deg))

  100%
    +transform(rotate(-360deg))

.container
  position: absolute
  top: 50%
  left: 50%
  margin-left: -100px
  height: $gearbox-height
  width: 200px
  margin-top: -($gearbox-height / 2)

.gearbox
  background: #111
  height: $gearbox-height
  width: 200px

  position: relative
  border: none
  overflow: hidden
  +border-radius(6px)
  +box-shadow(0px 0px 0px 1px white(0.1))
  

  .overlay
    +border-radius(6px)
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 10
    +box-shadow(inset 0px 0px 20px black(1))
    +single-transition(background, .2s)

  &.turn .overlay
    background: rgba(0,0,0,0.0)

$gear-color: #555

$gear-size: 60px

$large-gear-size: $gear-size * 2

.gear
  position: absolute
  height: $gear-size
  width: $gear-size
  +box-shadow(0px -1px 0px 0px lighten($gear-color, 20%), 0px 1px 0px 0px darken($gear-color, 40%))
  +border-radius($gear-size / 2)

  &.large
    height: $large-gear-size
    width: $large-gear-size
    +border-radius($large-gear-size / 2)

    &:after
      $large-gear-inner-size: $large-gear-size - 24px
      height: $large-gear-size - 24px
      width: $large-gear-size - 24px
      +border-radius(($large-gear-size - 24px) / 2)
      margin-left: -(($large-gear-size - 24px) / 2)
      margin-top: -(($large-gear-size - 24px) / 2)

  $center: 10px

  &.one
    top: $center + 2px
    left: $center

  &.two
    top: 51 + $center
    left: 50px + $center

  &.three
    top: 100px + $center
    left: $center

  &.four
    top: $center + 3px
    left: $center + 118px

  &:after
    content: ''
    position: absolute
    height: $gear-size - 24px
    width: $gear-size - 24px
    +border-radius(36px)
    background: #111
    // border: 1px solid lighten($gear-color, 10%)
    top: 50%
    left: 50%
    margin-left: -(($gear-size - 24px) / 2)
    margin-top: -(($gear-size - 24px) / 2)
    z-index: 3
    +box-shadow(0px 0px 10px white(0.1), inset 0px 0px 10px black(0.1), inset 0px 2px 0px 0px darken($gear-color,30%), inset 0px -1px 0px 0px lighten($gear-color, 20%) )

.gear-inner
  position: relative
  height: 100%
  width: 100%
  background: $gear-color
  -webkit-animation-iteration-count: infinite
  -moz-animation-iteration-count: infinite
  +border-radius($gear-size / 2)
  border: 1px solid white(0.1)

  .large &
    +border-radius($large-gear-size / 2)

  .gear.one &
    -webkit-animation: counter-clockwise 3s infinite linear
    -moz-animation: counter-clockwise 3s infinite linear

  .gear.two &
    -webkit-animation: clockwise 3s infinite linear
    -moz-animation: clockwise 3s infinite linear

  .gear.three &
    -webkit-animation: counter-clockwise 3s infinite linear
    -moz-animation: counter-clockwise 3s infinite linear

  .gear.four &
    -webkit-animation: counter-clockwise 6s infinite linear
    -moz-animation: counter-clockwise 6s infinite linear

  .bar
    $bar-width: 16px
    $bar-height: 8px

    $actual-height: $bar-width
    $actual-width: ($bar-height * 2) + $gear-size
    background: $gear-color
    height: $actual-height
    width: $actual-width
    position: absolute
    left: 50%
    margin-left: -($actual-width / 2)
    top: 50%
    margin-top: -($actual-height / 2)
    +border-radius(2px)
    border-left: 1px solid white(0.1)
    border-right: 1px solid white(0.1)

    .large &
      $large-bar-width: ($bar-height * 2) + ($gear-size * 2)
      margin-left: -($large-bar-width / 2)
      width: $large-bar-width

    &:nth-child(2)
      +transform(rotate(60deg))

    &:nth-child(3)
      +transform(rotate(120deg))

    &:nth-child(4)
      +transform(rotate(90deg))

    &:nth-child(5)
      +transform(rotate(30deg))

    &:nth-child(6)
      +transform(rotate(150deg))

h1
  font-family: 'Helvetica'
  text-align: center
  text-transform: uppercase
  color: #888
  font-size: 19px
  padding-top: 10px
  text-shadow: 1px 1px 0px #111
