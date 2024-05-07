# -*- coding: utf-8 -*-

from typing import List

from qfluentwidgets import (
    SettingCardGroup,

    PrimaryPushSettingCard,
    PushSettingCard,

    ExpandGroupSettingCard,

    FolderListSettingCard,
    ScrollArea,
    ExpandLayout, BodyLabel, Slider, PushButton, SwitchButton, IndicatorPosition, RangeConfigItem, QConfig
)
from qfluentwidgets import FluentIcon as FIF
from qfluentwidgets import InfoBar
from PySide6.QtCore import Qt, QStandardPaths
from PySide6.QtWidgets import QWidget, QLabel, QFileDialog, QHBoxLayout

from .gallery_interface import GalleryInterface
from ..components.fluent.widget_label import FBodyLabel
from ..components.fluent.widget_push_button import FPushButton

from ...common.config import cfg, Config
from ...common.style_sheet import StyleSheet
from ....datatype.shmtu.auth.auth_user import UserItem

from ....utils.logs import get_logger

logger = get_logger()


class SliderWithText(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)

        self.value_label = QLabel(self)

        self.slider = Slider(Qt.Horizontal, self)
        self.slider.setFixedWidth(200)
        self.slider.valueChanged.connect(self._on_value_update)

        self.hBoxLayout = QHBoxLayout(self)

        self.hBoxLayout.addWidget(self.value_label)
        self.hBoxLayout.addWidget(self.slider)

        self.setLayout(self.hBoxLayout)

    def _on_value_update(self, value):
        self.value_label.setText(str(value))

    def set_range(self, min_value, max_value):
        self.slider.setRange(min_value, max_value)

    def set_value(self, value):
        self.slider.setValue(value)

    def get_value(self):
        return self.slider.value()


class SettingGroupSliderWithText(SliderWithText):
    def __init__(self, range_config_item: RangeConfigItem, parent=None):
        super().__init__(parent)
        self.range_config_item = range_config_item

        value_range: tuple = self.range_config_item.range
        self.set_range(value_range[0], value_range[1])

        self.set_value(self.range_config_item.value)

        self.slider.valueChanged.connect(self._value_change_update_setting)

    def _value_change_update_setting(self, value):
        self.range_config_item.value = value
        self.range_config_item.serialize()

    def restore_default_value(self):
        self.set_value(self.range_config_item.defaultValue)


class InternetCheckSettingCard(ExpandGroupSettingCard):

    def __init__(self, cfg: Config, parent=None):
        super().__init__(
            FIF.SPEED_OFF,
            "状态检测设置",
            "设置状态检测的具体细节(一般不需要调整)",
            parent
        )

        self.cfg = cfg

        # 调整内部布局
        self.viewLayout.setContentsMargins(0, 0, 0, 0)
        self.viewLayout.setSpacing(0)

        # 加载其他组件
        self._init_content()

        # 恢复默认按钮
        self.restore_button = FPushButton(self, "恢复默认")
        self.restore_button.clicked.connect(self._restore_default)
        self.restore_button.setFixedWidth(135)
        self.restore_label = FBodyLabel("调错了？！恢复缺省值吧~", self)
        self.add(self.restore_label, self.restore_button)

    def _init_content(self):
        self.check_internet_interval_slider = \
            SettingGroupSliderWithText(self.cfg.checkInternetInterval, self)

        self.add(FBodyLabel("检测间隔", self), self.check_internet_interval_slider)

    def _restore_default(self):
        pass

    def add(self, label, widget):
        w = QWidget()
        w.setFixedHeight(60)

        layout = QHBoxLayout(w)
        layout.setContentsMargins(48, 12, 48, 12)

        layout.addWidget(label)
        layout.addStretch(1)
        layout.addWidget(widget)

        # 添加组件到设置卡
        self.addGroupWidget(w)


class AuthSettingWidget(ScrollArea):

    def __init__(self, parent=None):
        super().__init__(parent=parent)
        self.scrollWidget = QWidget()
        self.expandLayout = ExpandLayout(self.scrollWidget)

        # setting label
        self.settingLabel = QLabel("设置", self)

        # shmtu-auth
        self.auth_group_general = SettingCardGroup(
            "校园网自动认证", self.scrollWidget)

        self.start_card = PrimaryPushSettingCard(
            text="启动",
            icon=FIF.HELP,
            title="启动",
            content="启动或关闭服务"
        )
        self.start_card.clicked.connect(lambda: print("!@#!@#"))
        self.auth_group_general.addSettingCard(self.start_card)

        self.check_interval_card = \
            InternetCheckSettingCard(cfg=cfg, parent=self.auth_group_general)
        self.auth_group_general.addSettingCard(self.check_interval_card)

        self.__init_widget()

    def __init_widget(self):
        # self.resize(1000, 800)
        self.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        self.setViewportMargins(0, 80, 0, 20)
        self.setWidget(self.scrollWidget)
        self.setWidgetResizable(True)
        self.setObjectName('settingInterface')

        # initialize style sheet
        self.scrollWidget.setObjectName('scrollWidget')
        self.settingLabel.setObjectName('settingLabel')
        StyleSheet.SETTING_INTERFACE.apply(self)

        # initialize layout
        self.__init_layout()

    def __init_layout(self):
        self.settingLabel.move(36, 30)

        # add cards to group
        # shmtu-auth
        # self.shmtuAuthGroup.addSettingCard(self.musicFolderCard)
        # self.shmtuAuthGroup.addSettingCard(self.downloadFolderCard)

        # add setting card group to layout
        self.expandLayout.setSpacing(28)
        self.expandLayout.setContentsMargins(36, 10, 36, 0)
        self.expandLayout.addWidget(self.auth_group_general)

    def __show_restart_tooltip(self):
        """ show restart tooltip """
        InfoBar.success(
            "更新成功",
            "设置已经保存，重启程序后生效。",
            duration=1500,
            parent=self
        )


class AuthInterface(GalleryInterface):
    """ Auth interface """

    user_list: List[UserItem]

    def __init__(self, parent=None, user_list: List[UserItem] = None):
        super().__init__(
            title="上海海事大学校园网自动认证",
            subtitle="Author:Haomin Kong",
            parent=parent
        )
        self.setObjectName('authInterface')

        if user_list is None:
            raise Exception("user_list is None")
        self.user_list = user_list

        self.authSettingsWidget = AuthSettingWidget(self)

        # self.iconView = IconCardView(self)
        self.vBoxLayout.addWidget(self.authSettingsWidget)
