import sys
from PySide6 import QtCore, QtWidgets, QtGui
import PySide6.QtCore
import PySide6.QtWidgets


class mainWindowUI(object):
    def setup(self, MainWindow):
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")

        #header

        self.headerLayout = QtWidgets.QHBoxLayout()
        self.tabButton1 = QtWidgets.QPushButton("Audio Conversions")
        self.tabButton3 = QtWidgets.QPushButton("Video Conversions")
        self.tabButton2 = QtWidgets.QPushButton("Music Player")

        self.headerLayout.addWidget(self.tabButton1)
        self.headerLayout.addWidget(self.tabButton2)
        self.headerLayout.addWidget(self.tabButton3)


        self.stackedLayouts = QtWidgets.QStackedLayout()


        #default layout

        self.mainLayout = QtWidgets.QGridLayout()
        self.mainLayout.addLayout(self.headerLayout, 0, 0)
        self.mainLayout.addLayout(self.stackedLayouts, 1, 0)

        self.tabButton1.clicked.connect(lambda x: self.switchMainLayout(0))
        self.tabButton2.clicked.connect(lambda x: self.switchMainLayout(1))

