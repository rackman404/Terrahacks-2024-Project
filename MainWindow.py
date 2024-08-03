import sys
from PySide6 import QtCore, QtWidgets, QtGui
import PySide6.QtCore
import PySide6.QtWidgets

from Scenes import EditScene
from Scenes import InteractiveScene

class mainWindowUI(object):
    def setup(self, MainWindow):
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")

        self.EditScene = EditScene.EditSceneUI()
        self.InteractiveScene = InteractiveScene.InteractiveSceneUI()
        self.EditScene.setup(self)
        self.InteractiveScene.setup(self)

        self.headerLayout = QtWidgets.QHBoxLayout()
        self.tabButton1 = QtWidgets.QPushButton("Edit Kitchen Parts")
        self.tabButton2 = QtWidgets.QPushButton("Interactive Kitchen Planner")

        self.headerLayout.addWidget(self.tabButton1)
        self.headerLayout.addWidget(self.tabButton2)

        #default layout


        self.stackedLayouts = QtWidgets.QStackedLayout()
        self.stackedLayouts.addWidget(self.EditScene.EditSceneLayoutContainer)
        self.stackedLayouts.addWidget(self.InteractiveScene.interactiveSceneLayoutContainer)

        self.mainLayout = QtWidgets.QGridLayout()
        self.mainLayout.addLayout(self.headerLayout, 0, 0)
        self.mainLayout.addLayout(self.stackedLayouts, 1, 0)

        self.tabButton1.clicked.connect(lambda x: self.switchMainLayout(0))
        self.tabButton2.clicked.connect(lambda x: self.switchMainLayout(1))

    @QtCore.Slot() #Tab switching
    def switchMainLayout(self, tabNum):
        print (tabNum) #debug 
        self.stackedLayouts.setCurrentIndex(tabNum)



